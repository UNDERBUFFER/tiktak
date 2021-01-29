import {
  Controller,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ClipsService } from './clips.service';
import { ClipDocument } from './schemas/clip.schema';
import { randomBytes } from 'crypto';

@Controller('clips')
export class ClipsController {
  constructor(private clipsService: ClipsService) {}

  @Post('add')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'video', maxCount: 1 }]))
  async add(@UploadedFiles() files, @Req() request): Promise<ClipDocument> {
    const buffer: Buffer = files.video[0].buffer;
    const name: string = `${request.user.nickname}-clip-${randomBytes(
      20,
    ).toString('hex')}.mp4`;
    const path: string = this.clipsService.uploadFileToSystem(name, buffer);
    return await this.clipsService.create(request.user, path);
  }
}
