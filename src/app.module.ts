import * as redisStore from 'cache-manager-redis-store';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  CacheModule,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserMiddleware } from './middlewares/user.middleware';
import { LoggingMiddleware } from './middlewares/logging.middleware';
import { UserService } from './user/user.service';
import { User, UserSchema } from './user/schemas/user.schema';
import { ClipsModule } from './clips/clips.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING ?? '', {
      useNewUrlParser: true,
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST ?? '',
      port: Number(process.env.REDIS_PORT ?? 0),
    }),
    UserModule,
    AuthModule,
    ClipsModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('');
    consumer.apply(LoggingMiddleware).forRoutes('');
  }
}
