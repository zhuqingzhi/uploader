import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { isNumber } from 'class-validator';

export class EmptyPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new Error('参数不能为空');
    }
    return value;
  }
}
