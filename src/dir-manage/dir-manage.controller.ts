import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DirManageService } from './dir-manage.service';
import { CreateDirDto } from './dto/create.dto';

@Controller('dir-manage')
export class DirManageController {
  constructor(private readonly dirManageService: DirManageService) {}
  @Get('init')
  async initData() {
    return this.dirManageService.init();
  }
  @Get('list')
  async list() {
    return this.dirManageService.list();
  }

  @Post('add')
  create(@Body() body: CreateDirDto) {
    return this.dirManageService.create(body);
  }
  @Get('/delete/:id')
  deleteRecord(@Param('id') id: string) {
    console.log('======', id);
    return this.dirManageService.deleteDir(id);
  }
}
