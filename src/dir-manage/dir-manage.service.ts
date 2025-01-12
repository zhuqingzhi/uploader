import { Get, Injectable } from '@nestjs/common';
import dataSource from 'src/utils/dataSource';
import { DirManage } from './entity/dirManage';
import { CreateDirDto } from './dto/create.dto';

@Injectable()
export class DirManageService {
  private readonly dirRepo;
  constructor() {
    this.dirRepo = dataSource.getRepository(DirManage);
  }
  async init() {
    const dirRepo = this.dirRepo;
    const dir1 = dirRepo.create({
      // id: '1',
      projectName: 'nanshan_middle',
      uploadDir: '/home/front/nanshan_middle',
    });
    const dir2 = dirRepo.create({
      // id: '1',
      projectName: 'default',
      uploadDir: '/home/front/default',
    });
    await dirRepo.save([dir1, dir2]);
    return 'success';
  }

  async list() {
    const dirRepo = this.dirRepo;
    const list = await dirRepo.find();
    return list;
  }
  async create(body: CreateDirDto) {
    const dirRepo = this.dirRepo;
    const dir = dirRepo.create(body);
    await dirRepo.save(dir);
    return dir;
  }
  async deleteDir(id: string) {
    await this.dirRepo.softDelete(id);
    return 'sccuess';
  }
}
