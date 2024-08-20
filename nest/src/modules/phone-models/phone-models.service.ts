import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PhoneModelEntity } from './phone-models.entity';
import { PhoneModelDto } from './dto/phone-models.dto';

@Injectable()
export class PhoneModelService {
  constructor(
    @InjectModel(PhoneModelEntity)
    private readonly phoneModelRepository: typeof PhoneModelEntity,
  ) {}

  async create(phoneModel: PhoneModelDto): Promise<PhoneModelEntity> {
    return await this.phoneModelRepository.create<PhoneModelEntity>(phoneModel);
  }

  // Define the findAll method to retrieve all phone models
  async findAll(): Promise<PhoneModelEntity[]> {
    return await this.phoneModelRepository.findAll<PhoneModelEntity>();
  }

  async findAllByPhoneId(phoneId: number): Promise<PhoneModelEntity[]> {
    return await this.phoneModelRepository.findAll<PhoneModelEntity>({
      where: { phoneId },
    });
  }

  async findOneById(model_id: number): Promise<PhoneModelEntity> {
    return await this.phoneModelRepository.findOne<PhoneModelEntity>({
      where: { model_id },
    });
  }
}
