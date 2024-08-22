export class CreateAppointmentDto {
  readonly date: string;
  readonly time: string;
  readonly customerId: number;
  readonly storeId: number;
  readonly deviceModelId: number;
  readonly faultId: number;
}
