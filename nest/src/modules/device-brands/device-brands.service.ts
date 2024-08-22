import { Injectable } from '@nestjs/common';
import { CreateDeviceBrandDto } from './dto/create-device-brand.dto';
import { InjectModel } from '@nestjs/sequelize';
import { DeviceBrand } from './entities/device-brand.entity';
import { Device } from '../devices/entities/device.entity';
import { DeviceModel } from '../device-models/entities/device-model.entity';

@Injectable()
export class DeviceBrandsService {
  constructor(
    @InjectModel(DeviceBrand)
    private readonly deviceBrand: typeof DeviceBrand,
  ) {}

  async create(
    createDeviceBrandDto: CreateDeviceBrandDto,
  ): Promise<DeviceBrand> {
    const deviceBrand = new DeviceBrand();
    deviceBrand.name = createDeviceBrandDto.name;
    deviceBrand.image = createDeviceBrandDto.image;
    deviceBrand.url = createDeviceBrandDto.url;
    return await deviceBrand.save();
  }

  async findAll(): Promise<DeviceBrand[]> {
    return await this.deviceBrand.findAll();
  }

  async findOne(id: number): Promise<DeviceBrand> {
    return await this.deviceBrand.findByPk(id);
  }
}
