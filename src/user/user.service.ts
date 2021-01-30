import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create.dto';
import { User, UserDocument } from './schemas/user.schema';
import { createCipher, createDecipher } from 'crypto';

@Injectable()
export class UserService {
  hashAlgorithm: string;
  hashKey: string;
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    this.hashAlgorithm = 'aes-192-cbc';
    this.hashKey = process.env.ENCRYPT_KEY ?? '';
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async getById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  async getByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({
      email,
    });
    return user;
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
