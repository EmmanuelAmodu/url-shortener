import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { URLDto } from './app.dto';
import { AppService } from './app.service';
import { ErrorResponse } from './utils/error.response';
import { SuccessResponse } from './utils/success.response';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  let urlDataResponse = { 
    url: 'example.domain.com',
    code: '13e1873acdf0fc47ac2fee5c398821844eb604478dd34a697e3b4731eaf3ab62'
  };

  let urlData: URLDto = { 
    url: 'example.domain.com'
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        SuccessResponse,
        ErrorResponse
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return call encode method in service with dto object', () => {
      jest.spyOn(appService, 'encode').mockImplementation(() => urlDataResponse);
      const res = appController.encode(urlData);
      expect(appService.encode).toHaveBeenCalledWith(urlData.url);
      expect(res.data).toMatchObject(urlDataResponse);
    });

    it('should return call decode method in service with dto object', () => {
      jest.spyOn(appService, 'decode').mockImplementation(() => urlDataResponse);
      const code = urlDataResponse.code.substring(0, 6);

      const res = appController.decode(code);
      expect(appService.decode).toHaveBeenCalledWith(code);
      expect(res.data).toMatchObject(urlDataResponse);
    });

    it('should return a INTERNAL_SERVER_ERROR if create failed', () => {
      jest.spyOn(appService, 'encode').mockImplementation(() => null);
      const res = appController.encode(urlData);
      expect(appService.encode).toHaveBeenCalledWith(urlData.url);
      expect(res.data).toBe(null);
      expect(res.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    });

    it('should return a NOT_FOUND response is url does not exist', () => {
      jest.spyOn(appService, 'decode').mockImplementation(() => null);
      const res = appController.decode(urlData.url);
      expect(appService.decode).toHaveBeenCalledWith(urlData.url);
      expect(res.data).toBe(null);
      expect(res.statusCode).toBe(HttpStatus.NOT_FOUND);
    });
  });
});
