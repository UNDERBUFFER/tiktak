import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UserService } from 'src/user/user.service';
import { ClipsService } from './clips.service';
import { ClipDocument } from './schemas/clip.schema';
import { LikeDocument } from './schemas/like.schema';

@Controller('clips')
export class ClipsController {
  constructor(
    private clipsService: ClipsService,
    private userService: UserService,
  ) {}

  @Post('add')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'video', maxCount: 1 }]))
  async add(@UploadedFiles() files, @Req() request): Promise<ClipDocument> {
    const buffer: Buffer = files.video[0].buffer;
    const fileName: string = this.clipsService.generateFileName(
      request.user.nickname,
    );
    const path: string = this.clipsService.uploadFileToSystem(fileName, buffer);
    return await this.clipsService.create(request.user, path);
  }

  @Get('user')
  async user(@Query('_id') userId, @Req() req): Promise<ClipDocument[]> {
    if (!userId) {
      console.log(req.user);
      return await this.clipsService.getByUser(req.user);
    } else {
      return await this.clipsService.getByUser(
        await this.userService.getById(String(userId)),
      );
    }
  }

  @Get('all')
  async all(): Promise<ClipDocument[]> {
    const documents = await this.clipsService.getAll();
    for (let clip of documents)
      clip.user = await this.userService.getById(String(clip.user));
    return documents;
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<ClipDocument> {
    const clip = await this.clipsService.getById(id);
    clip.user = await this.userService.getById(String(clip.user));
    return clip;
  }

  @Post(':id/like')
  async like(@Param('id') id: string, @Req() req): Promise<LikeDocument> {
    return await this.clipsService.like(id, req.user);
  }
}
