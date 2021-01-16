import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth as AuthCodeInterface } from './auth.interface';
import { AuthCode, AuthCodeDocument } from './auth.scheme';
import { randomBytes } from 'crypto'

@Injectable()
export class AuthService {
  constructor(@InjectModel(AuthCode.name) private authCodeModel: Model<AuthCodeDocument>) {}

  async create(): Promise<AuthCodeDocument> {
    const data: AuthCodeInterface = {
      code: randomBytes(20).toString('hex')
    };
    const authCode = new this.authCodeModel(data);
    return authCode.save();
  }

  async get(code: string): Promise<AuthCodeDocument> {
    const authCode = await this.authCodeModel.findOne({
      code
    });
    return authCode;
  }

  async delete(code: string): Promise<any> {
    const deletedAuthCode = await this.authCodeModel.findOne({
      code
    }).remove();
    return deletedAuthCode;
  }
}
