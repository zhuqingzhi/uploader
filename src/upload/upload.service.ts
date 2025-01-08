import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import projectKeys from 'src/config/projectKeys';
import { saveFile, zipDir, unzip, rmFile } from 'src/utils';
import { FileManageEntity } from './entity/FileVersionManage';
import { Repository } from 'typeorm';

@Injectable()
export class UploadService {
  @InjectRepository(FileManageEntity)
  fileManageRepository: Repository<FileManageEntity>;
  async deploy(file: Express.Multer.File, projectKey: string) {
    try {
      // 上传文件
      const savedFilename = await saveFile(file, projectKeys[projectKey]);
      if (savedFilename) {
        // 压缩原有文件
        const zipedData = await zipDir(projectKeys[projectKey], projectKey);
        // 保存历史版本到数据库
        if (zipedData) {
          const { zipedFilename, version } = zipedData as {
            zipedFilename: string;
            version: string;
          };
          const fileManageInstance = new FileManageEntity();
          fileManageInstance.projectKey = projectKey;
          fileManageInstance.name = file.originalname;
          fileManageInstance.path = zipedFilename as string;
          fileManageInstance.version = version;
          await this.fileManageRepository.save(fileManageInstance);
        }
        // 解压zip文件
        await unzip(savedFilename as string);
        // 删除zip压缩包
        await rmFile(savedFilename as string);
        return 'success';
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
