import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthCode, AuthCodeSchema } from './schemas/authcode.schema';
import { UserService } from 'src/user/user.service';
import { User, UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AuthCode.name,
        schema: AuthCodeSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MailerModule.forRoot({
      transport: process.env.SMTP_SERVER ?? '',
      defaults: {
        from: `"nest-modules" <${process.env.FROM_EMAIL ?? ''}>`,
      },
    }),
    CacheModule.register({
      ttl: 3600,
      store: redisStore,
      host: process.env.REDIS_HOST ?? '',
      port: Number(process.env.REDIS_PORT ?? 0),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
