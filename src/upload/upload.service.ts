import { BadRequestException, Injectable } from '@nestjs/common';
import projectKeys from 'src/config/projectKeys';
import { saveFile, zipDir, unzip, rmFile } from 'src/utils';

@Injectable()
export class UploadService {
  async deploy(file: Express.Multer.File, projectKey: string) {
    try {
      // 上传文件
      const savedFilename = await saveFile(file, projectKeys[projectKey]);
      if (savedFilename) {
        // 压缩原有文件
        const zipedData = await zipDir(projectKeys[projectKey], projectKey);
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
  async getUploadDirList() {
    return [];
  }
}
