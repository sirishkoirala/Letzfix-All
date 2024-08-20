import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class PhoneModelDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsUrl()
  readonly url: string;

  @IsNotEmpty()
  readonly phoneId: number;
}
