import { Module } from '@nestjs/common';
import { DirManageService } from './dir-manage.service';
import { DirManageController } from './dir-manage.controller';

@Module({
  controllers: [DirManageController],
  providers: [DirManageService]
})
export class DirManageModule {}
