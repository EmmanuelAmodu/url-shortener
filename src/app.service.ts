import { Injectable } from '@nestjs/common';
import { createHmac } from 'crypto';
import configuration from '../config/configuration';

type URLCODEDOBJ = {
  [key: string]: URLCODED
};

type URLCODED = {
  url: string;
  code: string;
  key: string;
  hits: number;
};

type Log = { 
  code: string;
  ip: string;
  createdAt: number;
};

@Injectable()
export class AppService {
  private _urlRepository = {}
  private _requestLogRepository: Log[] = []

  get urlRepository(): URLCODEDOBJ {
    const repos = {...this._urlRepository};
    for (const key in repos) {
      if (Object.prototype.hasOwnProperty.call(repos, key)) {
        repos[key].key = key;
        repos[key].hits = this.getRequestLogRepository(key).length;
      }
    }

    return repos;
  }

  setRequestLogRepository(log: Log) {
    this._requestLogRepository.push(log);
  }

  getRequestLogRepository(code: string): Log[] {
    return this._requestLogRepository.filter(log => log.code === code);
  }

  encode(url: string): URLCODED {
    const code = createHmac('sha256', configuration.secret).update(url).digest('hex');
    const key = code.substring(0, 6);
    this._urlRepository[key] = { url, code, key, hits: 0 };
    return this._urlRepository[key];
  }

  decode(id: string): URLCODED {
    return this._urlRepository[id];
  }
}
