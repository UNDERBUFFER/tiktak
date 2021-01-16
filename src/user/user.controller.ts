import { Controller, Body, Get, Param, Post, Render, Res } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { UserDocument } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

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
        return user
    }
}
