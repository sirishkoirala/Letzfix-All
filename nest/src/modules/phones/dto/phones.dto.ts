import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class PhonesDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly image: string;

  @IsNotEmpty()
  @IsUrl()
  readonly url: string;
}
