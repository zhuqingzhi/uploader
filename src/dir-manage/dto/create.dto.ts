import { PickType } from '@nestjs/mapped-types';
import { DirManage } from '../entity/dirManage';
import { IsString } from 'class-validator';

export class CreateDirDto extends PickType(DirManage, [
  'projectName',
  'uploadDir',
]) {
  @IsString({
    message: '项目名称必须是字符串',
  })
  projectName: string;
  @IsString({
    message: '上传路径必须是字符串',
  })
  uploadDir: string;
}
