import {
  Controller,
  Body,
  Get,
  Param,
  Post,
  CACHE_MANAGER,
  Inject,
  Put,
  UseInterceptors,
  UploadedFiles,
  Req,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create.dto';
import { UserDocument } from './schemas/user.schema';
import { UserService } from './user.service';
import { ConfirnUserDto } from './dto/confirn.dto';
import { Cache } from 'cache-manager';
import { UpdateUserDto } from './dto/update.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

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

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request,
  ): Promise<UserDocument | {}> {
    if (String(request.user._id) !== id) return {};
    return await this.userService.update(id, updateUserDto);
  }

  @Post(':id/avatar')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'avatar', maxCount: 1 }]))
  async uploadAvatar(
    @UploadedFiles() files,
    @Param('id') id: string,
    @Req() request,
  ): Promise<UserDocument | {}> {
    if (String(request.user._id) !== id) return {};
    const buffer: Buffer = files.avatar[0].buffer;
    const fileName: string = this.userService.generateFileName(
      request.user.nickname,
    );
    const avatarPath = this.userService.uploadFileToSystem(fileName, buffer);
    // const data = new UpdateUserDto()
    // data.avatarPath = avatarPath
    return await this.userService.update(id, { avatarPath });
  }

  @Post('registration')
  async registration(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserDocument> {
    const user: UserDocument = await this.userService.create(createUserDto);
    const uniqueUri = await this.authService.getUniqueUri();
    await this.cacheManager.set(uniqueUri, user._id);
    console.log(`url /auth/${uniqueUri}`);
    return user;
  }

  @Post('login')
  async login(@Body() confirnUserDto: ConfirnUserDto): Promise<UserDocument> {
    const user: UserDocument = await this.userService.getByEmail(
      confirnUserDto.email,
    );
    const uniqueUri = await this.authService.getUniqueUri();
    await this.cacheManager.set(uniqueUri, user._id);
    console.log(`url /auth/${uniqueUri}`);
    return user;
  }
}
