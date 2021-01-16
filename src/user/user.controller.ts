import { Controller, Body, Get, Param, Post } from '@nestjs/common';
import { CreateUsertDto } from './create-user.dto';

@Controller('user')
export class UserController {
    @Get(':id')
    findOne(@Param('id') id: string): string {
        console.log(`getting user with id ${id}`);
        return 'get';
    }
    @Post()
    create(@Body() createUserDto: CreateUsertDto): string {
        console.log(`creating user with body ${JSON.stringify(createUserDto)}`);
        return 'post';
    }
}
