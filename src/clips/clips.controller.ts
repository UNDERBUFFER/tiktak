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

@Controller('clips')
export class ClipsController {
  constructor(private clipsService: ClipsService) {}

  @Post('add')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'video', maxCount: 1 }]))
  async add(@UploadedFiles() files, @Req() request): Promise<ClipDocument> {
    const buffer: Buffer = files.video[0].buffer;
    const fileName: string = this.clipsService.generateFileName(request.user.nickname)
    const path: string = this.clipsService.uploadFileToSystem(fileName, buffer);
    return await this.clipsService.create(request.user, path);
  }
}
