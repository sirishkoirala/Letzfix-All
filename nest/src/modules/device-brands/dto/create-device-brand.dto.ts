import { CreateDeviceModelDto } from "src/modules/device-models/dto/create-device-model.dto";

export class CreateDeviceBrandDto {
  readonly name: string;
  readonly image: string;
  readonly url: string;
  readonly models?: CreateDeviceModelDto[]; 
}
