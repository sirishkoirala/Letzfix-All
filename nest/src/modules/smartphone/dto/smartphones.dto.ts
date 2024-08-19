export class CreateSmartPhonesDto {
  readonly name: string;
  readonly image: string;
  readonly url: string;
}

export class UpdateSmartPhonesDto {
  readonly name?: string;
  readonly image?: string;
  readonly url?: string;
}
