import { Injectable } from '@nestjs/common';
import * as onoff from 'onoff';
import { logger } from './logger';

@Injectable()
export class Rpi {
  async setValue(pin: number, value: boolean) {
    logger.debug('Rpi.setValue', {
      pin,
      value,
    });
    const gpio = new onoff.Gpio(pin, 'out');
    await gpio.write(value ? 1 : 0);
  }
}
