import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeviceBrandDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  url: string;
}
