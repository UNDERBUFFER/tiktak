import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  async use(req: any, res: any, next: () => void) {
    let code: string | null = req.headers.authorization;
    if (typeof code == 'string') code = code.replace('Token: ', '');
    if (code) {
      const _id = (await this.authService.get(code)).user;
      req.user = await this.userService.getById(String(_id));
    }
    next();
  }
}
