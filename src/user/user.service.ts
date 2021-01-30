import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create.dto';
import { User, UserDocument } from './schemas/user.schema';
import { createCipher, createDecipher } from 'crypto';
import { UpdateUserDto } from './dto/update.dto';
import { randomBytes } from 'crypto';
import { join } from 'path';
import { writeFile } from 'fs';

@Injectable()
export class UserService {
  hashAlgorithm: string;
  hashKey: string;
  fileFormat: string;
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    this.hashAlgorithm = 'aes-192-cbc';
    this.hashKey = process.env.ENCRYPT_KEY ?? '';
    this.fileFormat = process.env.AVATART_FORMAT ?? 'png';
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

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.userModel.updateOne({ _id: id }, { $set: updateUserDto });
  }

  generateFileName(uniqueString: string): string {
    return `${uniqueString}-avatar-${randomBytes(20).toString('hex')}.${
      this.fileFormat
    }`;
  }

  uploadFileToSystem(filename: string, buffer: Buffer): string {
    const path = `${join(
      __dirname,
      '..',
      '..',
      'public',
      'avatars',
    )}/${filename}`;
    writeFile(path, buffer, (err) => {
      if (err) throw err;
    });
    return `/public/avatars/${filename}`;
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
