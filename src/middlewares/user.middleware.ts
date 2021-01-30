import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: any, res: any, next: () => void) {
    let code: string[] | string = req.headers.Authorization;
    if (typeof code == 'object') code = code[0];
    code = code.replace('Token: ', '');
    if (code) {
      req.user = (await this.authService.get(code)).user;
    }
    next();
  }
}
