import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreDto } from './create-store.dto';

export class UpdateStoreDto extends PartialType(CreateStoreDto) {
  readonly name: string;
  readonly address1: string;
  readonly address2: string;
  readonly city: string;
  readonly state: string;
  readonly country: string;
  readonly postcode: string;
  readonly phone: string;
}
