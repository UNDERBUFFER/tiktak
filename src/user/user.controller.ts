import { Controller, Body, Get, Param, Post, Render } from '@nestjs/common';
import { AuthCodeDocument } from 'src/auth/schemas/authcode.schema';
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
    async create(@Body() createUserDto: CreateUserDto): Promise<UserDocument> {
        const user: UserDocument = await this.userService.create(createUserDto)
        console.log(`code ${(await this.authService.create(user)).code}`)
        return user
    }
}
