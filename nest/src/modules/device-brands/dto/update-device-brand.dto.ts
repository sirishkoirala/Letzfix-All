import { PartialType } from '@nestjs/mapped-types';
import { CreateDeviceBrandDto } from './create-device-brand.dto';

export class UpdateDeviceBrandDto extends PartialType(CreateDeviceBrandDto) {}
