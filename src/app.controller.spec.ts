import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Rpi } from './rpi';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, Rpi],
    }).compile();
  });

  describe('getStatus', () => {
    it('should return object', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getStatus()).toBeDefined();
    });
  });
});
