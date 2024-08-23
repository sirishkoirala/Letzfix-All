import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DeviceModel } from './entities/device-model.entity';
import { CreateDeviceModelDto } from './dto/create-device-model.dto';

@Injectable()
export class DeviceModelsService {
  constructor(
    @InjectModel(DeviceModel)
    private readonly deviceModel: typeof DeviceModel,
  ) {}

  async create(createDeviceModelDto: CreateDeviceModelDto): Promise<DeviceModel> {
    return await this.deviceModel.create({
      name: createDeviceModelDto.name,
      deviceBrandId: createDeviceModelDto.deviceBrandId,
    });
  }

  async findAll(): Promise<DeviceModel[]> {
    return await this.deviceModel.findAll();
  }

  async findOne(id: number): Promise<DeviceModel> {
    return await this.deviceModel.findByPk(id);
  }

  async remove(id: number): Promise<void> {
    const deviceModel = await this.deviceModel.findByPk(id);
    if (deviceModel) {
      await deviceModel.destroy();
    }
  }
}
