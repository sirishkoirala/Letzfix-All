import { Injectable } from '@nestjs/common';
import { PhoneModelDto } from './dto/phone-model.dto';

@Injectable()
export class PhoneModelService {
  private phoneModels: PhoneModelDto[] = [];

  getAllPhoneModels(): PhoneModelDto[] {
    return this.phoneModels;
  }

  getPhoneModelById(model_id: number): PhoneModelDto | undefined {
    return this.phoneModels.find((model) => model.model_id === model_id);
  }

}
