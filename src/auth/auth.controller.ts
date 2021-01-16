import { Controller, Get, Param, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get(':code')
    async findOne(@Param('code') code: string, @Res() res: any): Promise<any> {
        const user = (await this.authService.get(code)).user
        await this.authService.delete(code)
        return res.redirect(`/user/${user._id}`)
    }
}
