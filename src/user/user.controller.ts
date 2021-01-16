import { Controller, Body, Get, Param, Post } from '@nestjs/common';
import { CreateUsertDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<string> {
        const user = await this.userService.get(id)
        return JSON.stringify(user)
    }

    @Post()
    async create(@Body() createUserDto: CreateUsertDto): Promise<string> {
        const user = await this.userService.create(createUserDto)
        return JSON.stringify(user)
    }
}
