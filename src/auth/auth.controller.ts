import { Controller, Get, Param, Res } from '@nestjs/common';
import { UserDocument } from 'src/user/schemas/user.schema';
import { encrypt } from 'src/user/utils/encrypt.util';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get(':code')
    async findOne(@Param('code') code: string, @Res({ passthrough: true }) res: any): Promise<any> {
        const user: UserDocument = (await this.authService.get(code)).user
        await this.authService.delete(code)
        res.cookie('_id', encrypt(user._id))
        return res.redirect(`/user/${user._id}`)
    }
}
