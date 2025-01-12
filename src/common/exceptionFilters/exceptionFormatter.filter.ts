import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
export class ExceptionForamtter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const response = http.getResponse<Response>();
    const status = exception.getStatus();
    const res = exception.getResponse() as { message: string[] };
    const msg = res?.message?.join ? res?.message.join(',') : res?.message;
    response.status(status).json({
      code: status,
      data: null,
      msg,
    });
  }
}
