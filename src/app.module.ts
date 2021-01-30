import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserMiddleware } from './middlewares/user.middleware';
import { LoggingMiddleware } from './middlewares/logging.middleware';
import { UserService } from './user/user.service';
import { ClipsModule } from './clips/clips.module';
import { AuthService } from './auth/auth.service';
import { AuthCode, AuthCodeSchema } from './auth/schemas/authcode.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING ?? '', {
      useNewUrlParser: true,
    }),
    MongooseModule.forFeature([
      {
        name: AuthCode.name,
        schema: AuthCodeSchema,
      },
    ]),
    UserModule,
    AuthModule,
    ClipsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('');
    consumer.apply(LoggingMiddleware).forRoutes('');
  }
}
