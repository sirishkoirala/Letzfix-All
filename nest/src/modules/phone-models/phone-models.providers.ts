import { PHONE_MODELS_REPOSITORY } from 'src/core/constants';
import { PhoneModelEntity as phonemodels } from './phone-models.entity';

export const phoneModelProviders = [
  {
    provide: PHONE_MODELS_REPOSITORY,
    useValue: phonemodels,
  },
];
