import { Controller, Body, Get, Param, Post, Render, Res, Req } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create.dto';
import { UserDocument } from './schemas/user.schema';
import { UserService } from './user.service';
import { ConfirnUserDto } from './dto/confirn.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService, private authService: AuthService) {}

    @Get(':id')
    @Render('user.hbs')
    async findOne(@Param('id') id: string): Promise<UserDocument> {
        const user: UserDocument = await this.userService.getById(id)
        return user
    }

    @Post('registration')
    @Render('check-email.hbs')
    async registration(@Body() createUserDto: CreateUserDto): Promise<UserDocument> {
        const user: UserDocument = await this.userService.create(createUserDto)
        console.log(`code ${(await this.authService.create(user)).code}`)
        return user
    }

    @Post('login')
    @Render('check-email.hbs')
    async login(@Body() confirnUserDto: ConfirnUserDto): Promise<UserDocument> {
        const user: UserDocument = await this.userService.getById(confirnUserDto.email);
        console.log(`code ${(await this.authService.create(user)).code}`);
        return user;
    }

    @Get('auth')
    @Render('auth.hbs')
    auth(@Res({ passthrough: true }) res: any, @Req() req: any): any {
        const _id: string | null = req.cookies['_id'];
        if (_id) res.redirect(`/user${_id}`);
        return {};
    }
}
