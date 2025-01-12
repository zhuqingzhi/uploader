import { FileManageEntity } from 'src/upload/entity/FileVersionManage';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { DirManage } from 'src/dir-manage/entity/dirManage';
dotenv.config({ path: __dirname + '/../../.development.env' });

console.log('======', process.env.MYSQL_USER);
const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: +process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [FileManageEntity, DirManage],
  synchronize: true,
});
dataSource.initialize();
export default dataSource;
