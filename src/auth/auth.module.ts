import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthCode, AuthCodeSchema } from './schemas/auth.scheme';
import { User, UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AuthCode.name,
        schema: AuthCodeSchema
      }
    ]),
    MailerModule.forRoot({
      transport: process.env.SMTP_SERVER ?? '',
      defaults: {
        from: `"nest-modules" <${process.env.FROM_EMAIL ?? ''}>`,
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
