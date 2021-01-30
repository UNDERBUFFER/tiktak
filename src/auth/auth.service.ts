import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthCode as AuthCodeInterface } from './interfaces/authcode.interface';
import { AuthCode, AuthCodeDocument } from './schemas/authcode.schema';
import { randomBytes } from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';
import { UserDocument } from 'src/user/schemas/user.schema';
import { createCipher, createDecipher } from 'crypto';

@Injectable()
export class AuthService {
  hashAlgorithm: string;
  hashKey: string;
  constructor(
    @InjectModel(AuthCode.name) private authCodeModel: Model<AuthCodeDocument>,
    private readonly mailerService: MailerService,
  ) {
    this.hashAlgorithm = 'aes-192-cbc';
    this.hashKey = process.env.ENCRYPT_KEY ?? '';
  }

  async create(
    user: UserDocument,
    sendToEmail: boolean = false,
  ): Promise<AuthCodeDocument> {
    const data: AuthCodeInterface = {
      code: randomBytes(40).toString('hex'),
      user,
    };
    const authCode = new this.authCodeModel(data);
    if (sendToEmail)
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Authorization code',
        text: data.code,
      });
    return authCode.save();
  }

  async get(code: string): Promise<AuthCodeDocument> {
    const authCode = await this.authCodeModel.findOne({
      code,
    });
    return authCode;
  }

  async delete(code: string): Promise<any> {
    const deletedAuthCode = await this.authCodeModel
      .findOne({
        code,
      })
      .remove();
    return deletedAuthCode;
  }

  encrypt(text: string): string {
    const cipher: any = createCipher(this.hashAlgorithm, this.hashKey);
    const encrypted: string =
      cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
    return encrypted;
  }

  decrypt(text: string): string {
    const decipher: any = createDecipher(this.hashAlgorithm, this.hashKey);
    const decrypted: string =
      decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
    return decrypted;
  }
}
