import {
  Controller,
  Body,
  Get,
  Param,
  Post,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create.dto';
import { UserDocument } from './schemas/user.schema';
import { UserService } from './user.service';
import { ConfirnUserDto } from './dto/confirn.dto';
import { Cache } from 'cache-manager';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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
    const uniqueUri = this.authService.getUniqueUri();
    await this.cacheManager.set(uniqueUri, user._id);
    console.log(`url /auth/${uniqueUri}`);
    return user;
  }

  @Post('login')
  async login(@Body() confirnUserDto: ConfirnUserDto): Promise<UserDocument> {
    const user: UserDocument = await this.userService.getByEmail(
      confirnUserDto.email,
    );
    const uniqueUri = this.authService.getUniqueUri();
    await this.cacheManager.set(uniqueUri, user._id);
    console.log(`url /auth/${uniqueUri}`);
    return user;
  }
}
