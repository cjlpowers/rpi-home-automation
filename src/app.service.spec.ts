import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService, DefaultSettings } from './app.service';
import { logger } from './logger';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    service = new AppService();
  });

  it('caluclate state for 48 hours"', () => {
    let date = new Date(2019, 1, 1);
    const endDate = new Date(2019, 1, 3);
    while (date < endDate) {
      const acccentState = service.calculateState(
        DefaultSettings.lighting.accent.switch,
        true,
        date,
      );
      const postState = service.calculateState(
        DefaultSettings.lighting.post.switch,
        true,
        date,
      );
      if (acccentState || postState) {
        logger.info(
          date + ': Accent = ' + acccentState + ' Post = ' + postState,
        );
      }
      date = new Date(date.valueOf() + 1000 * 60 * 10);
    }
  });
});
