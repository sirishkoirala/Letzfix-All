import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDto } from './create-appointment.dto';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
  readonly date?: string;
  readonly time?: string;
  readonly customerId?: number;
  readonly storeId?: number;
  readonly deviceModelId?: number;
  readonly faultId?: number;
}
