import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  @IsString()
  store_city: string;

  @IsNotEmpty()
  @IsString()
  store_address: string;
}
