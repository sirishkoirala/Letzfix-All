import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DeviceModel } from './entities/device-model.entity';
import { CreateDeviceModelDto } from './dto/create-device-model.dto';
import { DeviceBrand } from '../device-brands/entities/device-brand.entity';

@Injectable()
export class DeviceModelsService {
  private readonly logger = new Logger(DeviceModelsService.name);

  constructor(
    @InjectModel(DeviceModel)
    private readonly deviceModel: typeof DeviceModel,
  ) {}

  async create(
    createDeviceModelDto: CreateDeviceModelDto,
  ): Promise<DeviceModel> {
    this.logger.log('Creating a new device model');

    const newModel = await this.deviceModel.create({
      name: createDeviceModelDto.name,
      deviceBrandId: createDeviceModelDto.deviceBrandId,
    });

    this.logger.log(`Device model created with ID: ${newModel.id}`);
    return newModel;
  }

  async findAll(): Promise<DeviceModel[]> {
    this.logger.log('Fetching all device models');

    const models = await this.deviceModel.findAll({
      include: [{ model: DeviceBrand }],
    });

    this.logger.log(`Fetched ${models.length} device models`);
    return models;
  }

  async findOne(id: number): Promise<DeviceModel> {
    this.logger.log(`Fetching device model with ID: ${id}`);

    const model = await this.deviceModel.findByPk(id);

    if (!model) {
      this.logger.warn(`Device model with ID ${id} not found`);
    }
    return model;
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Removing device model with ID: ${id}`);

    const model = await this.deviceModel.findByPk(id);

    if (model) {
      await model.destroy();
      this.logger.log(`Device model with ID ${id} removed`);
    } else {
      this.logger.warn(`Device model with ID ${id} not found`);
    }
  }
}
