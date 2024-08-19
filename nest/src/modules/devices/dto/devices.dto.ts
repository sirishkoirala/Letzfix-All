export class CreateDevicesDto {
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly url: string;
}

export class UpdateDevicesDto {
  readonly name?: string;
  readonly image?: string;
  readonly url?: string;
}
