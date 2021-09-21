import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('UsersService', () => {
  let service: AppService;
  let urlData = { 
    url: 'example.domain.com',
    code: '13e1873acdf0fc47ac2fee5c398821844eb604478dd34a697e3b4731eaf3ab62',
    key: '13e187',
    hits: 0
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService
      ],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should save and return an encoded object of the url', () => {
    expect(service.encode(urlData.url)).toMatchObject(urlData);
  });

  it('should return an encoded object of the url', () => {
    const result = service.encode(urlData.url);
    const decoded = service.decode(urlData.key);
    expect(decoded).toMatchObject(result);
  });

  it('should save and return an encoded object of the url', () => {
    const result = service.encode(urlData.url);
    expect(service.urlRepository[urlData.key]).toMatchObject(result);
  });

  it('should save and return an encoded object of the url', () => {
    service.setRequestLogRepository({ code: urlData.key, ip: '127.0.0.1', createdAt: Date.now()});

    const result = service.getRequestLogRepository(urlData.key);
    expect(result.length).toBe(1);
    expect(result[0].code).toBe(urlData.key);
  });
});
