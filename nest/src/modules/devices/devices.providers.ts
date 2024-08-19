import { Devices as devices } from './devices.entity';

export const devicesProviders = [
  {
    provide: 'DEVICES_REPOSITORY',
    useValue: devices,
  },
];
