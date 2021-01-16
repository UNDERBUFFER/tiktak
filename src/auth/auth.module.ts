import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthCode, AuthCodeSchema } from './auth.scheme';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AuthCode.name,
        schema: AuthCodeSchema
      }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
