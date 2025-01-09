import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UploadModule } from './upload/upload.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UploadModule,
    ConfigModule.forRoot({
      envFilePath: 'src/config/.development.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
