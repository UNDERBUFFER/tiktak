import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

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
      email
    });
    return user;
  }
}
