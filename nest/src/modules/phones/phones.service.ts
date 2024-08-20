import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PhonesEntity } from './phones.entity';
import { PhonesDto } from './dto/phones.dto';
import { PhoneModelEntity } from '../phone-models/phone-models.entity';

@Injectable()
export class PhonesService {
  constructor(
    @InjectModel(PhonesEntity)
    private readonly phonesRepository: typeof PhonesEntity,
  ) {}

  async create(phone: PhonesDto): Promise<PhonesEntity> {
    return await this.phonesRepository.create<PhonesEntity>(phone);
  }

  async findOneById(id: number): Promise<PhonesEntity> {
    return await this.phonesRepository.findOne<PhonesEntity>({
      where: { id },
      include: [PhoneModelEntity], 
    });
  }

  async findAll(): Promise<PhonesEntity[]> {
    return await this.phonesRepository.findAll<PhonesEntity>({
      include: [PhoneModelEntity], 
    });
  }
}
