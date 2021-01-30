import { Controller, Get, Param } from '@nestjs/common';
import { UserDocument } from 'src/user/schemas/user.schema';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get(':code')
  async findOne(@Param('code') code: string): Promise<GoodResponse> {
    const user: UserDocument = (await this.authService.get(code)).user;
    await this.authService.delete(code);
    return {
      code: this.authService.encrypt(String(user._id)),
    };
  }
}
