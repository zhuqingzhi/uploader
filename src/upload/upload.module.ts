import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileManageEntity } from './entity/FileVersionManage';

@Module({
  imports: [TypeOrmModule.forFeature([FileManageEntity])],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
