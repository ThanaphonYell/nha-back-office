import { Injectable } from '@nestjs/common';
import { ELoggerAction, ELoggerType } from '../entities/system-logger.entity';

@Injectable()
export class LoggerService {
  add<T>(type: keyof typeof ELoggerType, payload: {
    action: keyof typeof ELoggerAction;
    username: string;
    data?: T
  }) {

    
    const e = ELoggerType[type];
    return 'This action adds a new logger';
  }

  findAll() {
    return `This action returns all logger`;
  }

  remove(id: number) {
    return `This action removes a #${id} logger`;
  }
}
