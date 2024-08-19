import { smartphones } from './smartphones.entity';
import { SMARTPHONES_REPOSITORY } from '../../core/constants';

export const smartPhonesProviders = [
  {
    provide: SMARTPHONES_REPOSITORY,
    useValue: smartphones,
  },
];
