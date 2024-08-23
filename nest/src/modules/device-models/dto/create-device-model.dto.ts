import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateDeviceModelDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  deviceBrandId: number;
}
