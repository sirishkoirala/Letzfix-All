import { PHONES_REPOSITORY } from 'src/core/constants';
import { PhonesEntity as phones } from './phones.entity';

export const phonesProviders = [
  {
    provide: PHONES_REPOSITORY,
    useValue: phones,
  },
];
