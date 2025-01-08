import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'file_manage',
})
export class FileManageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ comment: '项目名称' })
  projectKey: string;

  @Column({ comment: '文件名' })
  name: string;

  @Column({ comment: '文件大小', nullable: true })
  size: number;
  @Column({ comment: '文件路径' })
  path: string;

  @Column({ comment: '文件类型', nullable: true })
  type: string;

  @Column({ comment: '文件版本' })
  version: string;

  @CreateDateColumn()
  createTime: Date;
}
