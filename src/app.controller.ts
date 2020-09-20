import { Controller, Get, Param } from '@nestjs/common';
import { AppService, DefaultSettings } from './app.service';
import { Rpi } from './rpi';
import { logger } from './logger';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rpi: Rpi,
  ) {
    /*
    // start the auto update process
    setTimeout(() => {
      this.update();
    }, 1000);
    */
  }

  @Get()
  getStatus(): object {
    return DefaultSettings;
  }

  @Get('rpi/:pin/:value')
  async setVaue(@Param('pin') pin: string, @Param('value') value: string) {
    await this.rpi.setValue(parseInt(pin), parseInt(value) === 1);
  }

  private async update() {
    const acccentState = this.appService.calculateState(
      DefaultSettings.lighting.accent.switch,
    );
    const postState = this.appService.calculateState(
      DefaultSettings.lighting.post.switch,
    );

    try {
      await this.rpi.setValue(6, acccentState);
      await this.rpi.setValue(5, postState);
    } catch (error) {
      logger.error(error);
    }

    setTimeout(() => {
      this.update();
    }, 1000 * 60);
  }
}
