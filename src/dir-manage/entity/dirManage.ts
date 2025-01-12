import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('upload_dir')
export class DirManage {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    comment: '项目名称',
  })
  projectName: string;

  @Column({
    comment: '上传路径',
  })
  uploadDir: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @DeleteDateColumn()
  deleteTime: Date;
}
