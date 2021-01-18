import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { decrypt } from '../user/utils/encrypt.util';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(req: any, res: any, next: () => void) {
    const _id: string | null = req.cookies['_id'];
    if (_id) {
      const userId: string = decrypt(_id);
      req.user = await this.userService.getById(userId);
    }
    next();
  }
}
