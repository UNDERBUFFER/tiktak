import {
  Controller,
  Body,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create.dto';
import { UserDocument } from './schemas/user.schema';
import { UserService } from './user.service';
import { ConfirnUserDto } from './dto/confirn.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDocument> {
    const user: UserDocument = await this.userService.getById(id);
    return user;
  }

  @Post('registration')
  async registration(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserDocument> {
    const user: UserDocument = await this.userService.create(createUserDto);
    console.log(`code ${(await this.authService.create(user)).code}`);
    return user;
  }

  @Post('login')
  async login(@Body() confirnUserDto: ConfirnUserDto): Promise<UserDocument> {
    const user: UserDocument = await this.userService.getByEmail(
      confirnUserDto.email,
    );
    console.log(`code ${(await this.authService.create(user)).code}`);
    return user;
  }
}
