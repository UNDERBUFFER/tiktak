import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthCode, AuthCodeSchema } from 'src/auth/auth.scheme';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
      {
        name: AuthCode.name,
        schema: AuthCodeSchema
      }
    ])
  ],
  controllers: [UserController],
  providers: [UserService, AuthService]
})
export class UserModule {}
