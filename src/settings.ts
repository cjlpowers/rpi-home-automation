export interface ToggleSwitch {
  kind: 'toggle';
  on: boolean;
}

export interface DelaySwitch {
  kind: 'delay';
  delay: number;
}

export interface DurationSwitch {
  kind: 'duration';
  duration: number;
}

export interface SolarSwitch {
  kind: 'solar';
  mode: 'day' | 'night';
}

export interface SeriesSwitch {
  kind: 'series';
  switches: Switch[];
}

export interface ParallelSwitch {
  kind: 'parallel';
  switches: Switch[];
}

export type Switch =
  | ToggleSwitch
  | DurationSwitch
  | DelaySwitch
  | SolarSwitch
  | ToggleSwitch
  | SeriesSwitch
  | ParallelSwitch;

export type NamedSwitch = Switch & {
  name?: string;
};

export interface LightingSettings {
  switch: NamedSwitch;
}

export interface Settings {
  lighting: {
    post: LightingSettings;
    accent: LightingSettings;
  };
}
