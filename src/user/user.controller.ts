import { Controller, Body, Get, Param, Post, Render, Res } from '@nestjs/common';
import { AuthCode, AuthCodeDocument } from 'src/auth/schemas/auth.scheme';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/user.dto';
import { UserDocument } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService, private authService: AuthService) {}

    @Get(':id')
    @Render('user.hbs')
    async findOne(@Param('id') id: string): Promise<UserDocument> {
        const user: UserDocument = await this.userService.get(id)
        return user
    }

    @Post()
    @Render('check-email.hbs')
    async create(@Body() createUserDto: CreateUserDto, @Res() res: any): Promise<UserDocument> {
        const user: UserDocument = await this.userService.create(createUserDto)
        const authCode: AuthCodeDocument = await this.authService.create(user)
        return user
    }
}
