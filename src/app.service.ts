import { Injectable } from '@nestjs/common';
import { createHmac } from 'crypto';
import configuration from '../config/configuration';

type Log = { 
  code: string;
  ip: string;
  createdAt: number;
};

@Injectable()
export class AppService {
  private _urlRepository = {}
  private _requestLogRepository: Log[] = []

  get urlRepository() {
    return this._urlRepository;
  }

  setRequestLogRepository(log: Log) {
    this._requestLogRepository.push(log);
  }

  getRequestLogRepository(code: string) {
    return this._requestLogRepository.filter(log => log.code === code);
  }

  encode(url: string) {
    const code = createHmac('sha256', configuration.secret).update(url).digest('hex');
    this._urlRepository[code.substring(0, 6)] = { url, code };
    return this._urlRepository[code.substring(0, 6)];
  }

  decode(id: string) {
    return this._urlRepository[id];
  }
}
