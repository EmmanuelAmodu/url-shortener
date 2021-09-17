import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('UsersService', () => {
  let service: AppService;

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

  it('should return an encoded object of the url', () => {
    expect(service.encode('url')).toBe('2d11045354322be3436659ed58835c0c5751aa15aafc54d2dfefea699096b8ab');
  });
});
