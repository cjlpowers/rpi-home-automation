import { Injectable } from '@nestjs/common';
import * as SunCalc from 'suncalc';
import { Settings, Switch, DelaySwitch, DurationSwitch } from './settings';

const Austin = {
  lat: 30.26759,
  long: -97.74299,
};

@Injectable()
export class AppService {
  calculateState(
    sw: Switch,
    powered: boolean = true,
    date: Date = new Date(),
  ): boolean {
    if (!sw) {
      return false;
    }

    switch (sw.kind) {
      case 'toggle':
        return powered && sw.on;
      case 'parallel':
        return sw.switches
          .map(x => this.calculateState(x, powered, date))
          .some(x => x);
      case 'series': {
        sw.switches.forEach(x => {
          powered = this.calculateState(x, powered, date);
        });
        return powered;
      }
      case 'solar': {
        const sunTimes = SunCalc.getTimes(date, Austin.lat, Austin.long);
        const isDay = date > sunTimes.sunrise && date < sunTimes.sunset;
        return powered && (sw.mode === 'night' ? !isDay : isDay);
      }
      case 'delay': {
        const current: DelaySwitch & { timestamp?: number } = sw;
        if (powered) {
          current.timestamp = current.timestamp || date.valueOf();
          return current.delay <= date.valueOf() - current.timestamp;
        } else {
          current.timestamp = undefined;
          return false;
        }
      }
      case 'duration': {
        const current: DurationSwitch & { timestamp?: number } = sw;
        if (powered) {
          current.timestamp = current.timestamp || date.valueOf();
          return current.duration > date.valueOf() - current.timestamp;
        } else {
          current.timestamp = undefined;
          return false;
        }
      }
    }
  }
}

export const DefaultSettings: Settings = {
  lighting: {
    accent: {
      switch: {
        kind: 'parallel',
        switches: [
          {
            kind: 'toggle',
            on: false,
          },
          {
            kind: 'series',
            switches: [
              {
                kind: 'solar',
                mode: 'night',
              },
              {
                kind: 'delay',
                delay: 1000 * 60 * 30,
              },
              {
                kind: 'duration',
                duration: 1000 * 60 * 60,
              },
            ],
          },
        ],
      },
    },
    post: {
      switch: {
        kind: 'parallel',
        switches: [
          {
            kind: 'toggle',
            on: false,
          },
          {
            kind: 'series',
            switches: [
              {
                kind: 'solar',
                mode: 'night',
              },
              {
                kind: 'delay',
                delay: 1000 * 60 * 90,
              },
              {
                kind: 'duration',
                duration: 1000 * 60 * 60 * 5,
              },
            ],
          },
        ],
      },
    },
  },
};
