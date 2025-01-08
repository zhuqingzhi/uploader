import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { UploadService } from './upload.service';

import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post('/deploy')
  @UseInterceptors(FileInterceptor('file'))
  async deploy(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'zip' })],
      }),
    )
    file: Express.Multer.File,
    @Body() body: any,
  ) {
    return await this.uploadService.deploy(file, body.projectKey);
  }

  @Get('/dir/list')
  getUploadDirList() {
    return this.uploadService.getUploadDirList();
  }
}
