import { PhoneModelDto } from '../../phone-model/dto/phone-model.dto';

export class PhonesDto {
  id: number;
  name: string;
  image: string;
  url: string;
  models: PhoneModelDto[];
}
