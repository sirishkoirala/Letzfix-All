import { PartialType } from '@nestjs/mapped-types';
import { CreateFaultDto } from './create-fault.dto';

export class UpdateFaultDto extends PartialType(CreateFaultDto) {
  readonly name?: string;
  readonly deviceId?: number;
}
