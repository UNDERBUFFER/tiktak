import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthCode, AuthCodeSchema } from 'src/auth/schemas/authcode.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: AuthCode.name,
        schema: AuthCodeSchema,
      },
    ]),
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST ?? '',
      port: Number(process.env.REDIS_PORT ?? 0),
    }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule {}
