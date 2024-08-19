import { Injectable } from '@nestjs/common';
import { PhonesDto } from './dto/phone.dto';

@Injectable()
export class PhonesService {
  private phones: PhonesDto[] = [];

  getAllPhones(): PhonesDto[] {
    return this.phones;
  }

  getPhoneById(id: number): PhonesDto | undefined {
    return this.phones.find((phone) => phone.id === id);
  }

}
