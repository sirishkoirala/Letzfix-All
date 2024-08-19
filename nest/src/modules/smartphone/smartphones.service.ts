import { Injectable, Inject } from '@nestjs/common';
import { smartphones as SmartPhones } from './smartphones.entity';
import {
  CreateSmartPhonesDto,
  UpdateSmartPhonesDto,
} from './dto/smartphones.dto';
import { SMARTPHONES_REPOSITORY } from 'src/core/constants';

@Injectable()
export class SmartPhonesService {
  constructor(
    @Inject(SMARTPHONES_REPOSITORY)
    private readonly smartPhonesRepository: typeof SmartPhones,
  ) {}

  create(createSmartPhonesDto: CreateSmartPhonesDto): Promise<SmartPhones> {
    return this.smartPhonesRepository.create(createSmartPhonesDto);
  }

  findAll(): Promise<SmartPhones[]> {
    return this.smartPhonesRepository.findAll();
  }

  findOne(id: number): Promise<SmartPhones> {
    return this.smartPhonesRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(
    id: number,
    updateSmartPhonesDto: UpdateSmartPhonesDto,
  ): Promise<[number, SmartPhones[]]> {
    return this.smartPhonesRepository.update(updateSmartPhonesDto, {
      where: { id },
      returning: true,
    });
  }

  delete(id: number): Promise<number> {
    return this.smartPhonesRepository.destroy({
      where: { id },
    });
  }
}
