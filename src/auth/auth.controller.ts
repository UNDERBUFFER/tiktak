import { CACHE_MANAGER, Controller, Get, Inject, Param } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { UserDocument } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthCodeDocument } from './schemas/authcode.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get(':uri')
  async findOne(@Param('uri') uri: string): Promise<AuthCodeDocument> {
    const userId: string = await this.cacheManager.get(uri);
    const user: UserDocument = await this.userService.getById(userId);
    const code: string = `${user._id}:${user.nickname}:${
      user.email
    }:${new Date()}`;
    return await this.authService.create(user, this.userService.encrypt(code));
  }
}
