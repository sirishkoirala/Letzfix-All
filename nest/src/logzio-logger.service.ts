import { Injectable, LoggerService } from '@nestjs/common';
import * as logzio from 'logzio-nodejs';

@Injectable()
export class LogzioLoggerService implements LoggerService {
  private logger: ReturnType<typeof logzio.createLogger>;

  constructor() {
    this.logger = logzio.createLogger({
      token: 'rEKVpREjuFhUYZvaVrmUlAqdRsuHUtQq',
      host: 'listener-au.logz.io',
      type: 'nestjs-logs',
    });
  }

  log(message: string) {
    console.log(message);
    this.logger.log({ level: 'info', message });
  }

  error(message: string, trace?: string) {
    console.error(message);
    this.logger.log({ level: 'error', message, trace });
  }

  warn(message: string) {
    console.warn(message);
    this.logger.log({ level: 'warn', message });
  }

  debug(message: string) {
    console.debug(message);
    this.logger.log({ level: 'debug', message });
  }

  verbose(message: string) {
    console.log(message);
    this.logger.log({ level: 'verbose', message });
  }
}
