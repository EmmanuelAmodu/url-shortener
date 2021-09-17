import { Injectable } from '@nestjs/common';
import { createHmac } from 'crypto';
import configuration from '../config/configuration';

const urlRepository = {

}

const requestLogRepository = {

}

@Injectable()
export class AppService {
  encode(url: string) {
    const code = createHmac('sha256', configuration.secret).update(url).digest('hex');
    urlRepository[code.substring(0, 6)] = { url, code };
    return urlRepository[code.substring(0, 6)];
  }

  decode(id: string) {
    return urlRepository[id];
  }

  saveLog() {

  }
}
