import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('UsersService', () => {
  let service: AppService;
  let urlData = { 
    url: 'example.domain.com',
    code: '13e1873acdf0fc47ac2fee5c398821844eb604478dd34a697e3b4731eaf3ab62'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService
      ],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save and return an encoded object of the url', () => {
    expect(service.encode(urlData.url)).toMatchObject(urlData);
  });

  it('should return an encoded object of the url', () => {
    expect(service.getUrl(urlData.code.substring(0, 6))).toMatchObject(urlData);
  });
});
