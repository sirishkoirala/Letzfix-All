import { Injectable, Logger } from '@nestjs/common';
import { CreateDeviceBrandDto } from './dto/create-device-brand.dto';
import { InjectModel } from '@nestjs/sequelize';
import { DeviceBrand } from './entities/device-brand.entity';
import { DeviceModel } from '../device-models/entities/device-model.entity';

@Injectable()
export class DeviceBrandsService {
  private readonly logger = new Logger(DeviceBrandsService.name);

  constructor(
    @InjectModel(DeviceBrand)
    private readonly deviceBrand: typeof DeviceBrand,
  ) {}

  async create(
    createDeviceBrandDto: CreateDeviceBrandDto,
  ): Promise<DeviceBrand> {
    this.logger.log('Creating a new device brand');

    const newBrand = await this.deviceBrand.create({
      name: createDeviceBrandDto.name,
      image: createDeviceBrandDto.image,
      url: createDeviceBrandDto.url,
    });

    this.logger.log(`Device brand created with ID: ${newBrand.id}`);
    return newBrand;
  }

  async findAll(): Promise<DeviceBrand[]> {
    this.logger.log('Fetching all device brands');
    const brands = await this.deviceBrand.findAll({
      include: [DeviceModel],
    });
    this.logger.log(`Fetched ${brands.length} device brands`);
    return brands;
  }

  async findOne(id: number): Promise<DeviceBrand> {
    this.logger.log(`Fetching device brand with ID: ${id}`);
    const brand = await this.deviceBrand.findByPk(id, {
      include: [DeviceModel],
    });
    if (!brand) {
      this.logger.warn(`Device brand with ID ${id} not found`);
    }
    return brand;
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Removing device brand with ID: ${id}`);
    const brand = await this.deviceBrand.findByPk(id);
    if (brand) {
      await brand.destroy();
      this.logger.log(`Device brand with ID ${id} removed`);
    } else {
      this.logger.warn(`Device brand with ID ${id} not found`);
    }
  }

  async update(
    id: number,
    updateDeviceBrandDto: Partial<CreateDeviceBrandDto>,
  ): Promise<DeviceBrand> {
    this.logger.log(`Updating device brand with ID: ${id}`);
    const brand = await this.deviceBrand.findByPk(id);
    if (brand) {
      const updatedBrand = await brand.update(updateDeviceBrandDto);
      this.logger.log(`Device brand with ID ${id} updated`);
      return updatedBrand;
    } else {
      this.logger.warn(`Device brand with ID ${id} not found`);
      return null;
    }
  }
}
