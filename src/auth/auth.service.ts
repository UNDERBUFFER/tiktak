import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthCode as AuthCodeInterface } from './interfaces/authcode.interface';
import { AuthCode, AuthCodeDocument } from './schemas/authcode.schema';
import { randomBytes } from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';
import { UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthCode.name) private authCodeModel: Model<AuthCodeDocument>,
    private readonly mailerService: MailerService,
  ) {}

  async create(
    user: UserDocument,
    encryptedCode: string,
    sendToEmail: boolean = false,
  ): Promise<AuthCodeDocument> {
    const data: AuthCodeInterface = {
      code: encryptedCode,
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

  getUniqueUri(): string {
    return randomBytes(40).toString('hex');
  }

  async get(code: string): Promise<AuthCodeDocument> {
    const authCode = await this.authCodeModel.findOne({
      code,
    });
    return authCode;
  }
}
