import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UploadModule } from './upload/upload.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileManageEntity } from './upload/entity/FileVersionManage';
import { DirManage } from './dir-manage/entity/dirManage';
import { DirManageModule } from './dir-manage/dir-manage.module';

@Module({
  imports: [
    UploadModule,
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('MYSQL_HOST'),
          port: configService.get('MYSQL_PORT'),
          database: configService.get('MYSQL_DATABASE'),
          username: configService.get('MYSQL_USER'),
          password: configService.get('MYSQL_PASSWORD'),
          connectorPackage: 'mysql2',
          poolSize: 10,
          entities: [FileManageEntity, DirManage],
          logging: true,
          synchronize: true,
        };
      },
    }),
    DirManageModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
