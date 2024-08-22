import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDeviceModelDto } from './dto/create-device-model.dto';
import { UpdateDeviceModelDto } from './dto/update-device-model.dto';
import { DeviceModel } from './entities/device-model.entity';

@Injectable()
export class DeviceModelsService {
  constructor(
    @InjectModel(DeviceModel)
    private readonly deviceModelModel: typeof DeviceModel,
  ) {}

  async create(
    createDeviceModelDto: CreateDeviceModelDto,
  ): Promise<DeviceModel> {
    const deviceModel = new DeviceModel();
    deviceModel.name = createDeviceModelDto.name;
    deviceModel.deviceBrandId = createDeviceModelDto.deviceBrandId;

    return await deviceModel.save();
  }

  async findAll(): Promise<DeviceModel[]> {
    return await this.deviceModelModel.findAll();
  }

  async findOne(id: number): Promise<DeviceModel> {
    return await this.deviceModelModel.findByPk(id);
  }

  async update(
    id: number,
    updateDeviceModelDto: UpdateDeviceModelDto,
  ): Promise<DeviceModel> {
    const deviceModel = await this.findOne(id);
    if (!deviceModel) {
      throw new Error(`DeviceModel with ID ${id} not found`);
    }
    deviceModel.name = updateDeviceModelDto.name || deviceModel.name;
    deviceModel.deviceBrandId =
      updateDeviceModelDto.deviceBrandId || deviceModel.deviceBrandId;

    return await deviceModel.save();
  }

  async remove(id: number): Promise<void> {
    const deviceModel = await this.findOne(id);
    if (deviceModel) {
      await deviceModel.destroy();
    }
  }
}
