import { Injectable } from '@nestjs/common';
import { CreateDeviceBrandDto } from './dto/create-device-brand.dto';
import { InjectModel } from '@nestjs/sequelize';
import { DeviceBrand } from './entities/device-brand.entity';
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
    return await this.deviceBrand.create({
      name: createDeviceBrandDto.name,
      image: createDeviceBrandDto.image,
      url: createDeviceBrandDto.url,
    });
  }

  async findAll(): Promise<DeviceBrand[]> {
    return await this.deviceBrand.findAll({
      include: [DeviceModel],
    });
  }

  async findOne(id: number): Promise<DeviceBrand> {
    return await this.deviceBrand.findByPk(id, {
      include: [DeviceModel],
    });
  }

  async remove(id: number): Promise<void> {
    const deviceBrand = await this.deviceBrand.findByPk(id);
    if (deviceBrand) {
      await deviceBrand.destroy();
    }
  }

  async update(
    id: number,
    updateDeviceBrandDto: Partial<CreateDeviceBrandDto>,
  ): Promise<DeviceBrand> {
    const deviceBrand = await this.deviceBrand.findByPk(id);
    if (deviceBrand) {
      return await deviceBrand.update(updateDeviceBrandDto);
    }
    return null;
  }
}
