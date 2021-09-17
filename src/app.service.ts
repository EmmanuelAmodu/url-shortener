import { Injectable } from '@nestjs/common';
import { createHmac } from 'crypto';
import configuration from '../config/configuration';

const urlRepository = {

}

@Injectable()
export class AppService {
  encode(url: string) {
    const code = createHmac('sha256', configuration.secret).update(url).digest('hex');
    urlRepository[code.substring(0, 6)] = { url, code };
    return urlRepository[code.substring(0, 6)];
  }

  getUrl(id: string) {
    return urlRepository[id];
  }
}
