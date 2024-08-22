import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Device } from './entities/device.entity';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device)
    private readonly deviceModel: typeof Device,
  ) {}

  async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    const device = new Device();
    device.name = createDeviceDto.name;
    device.image = createDeviceDto.image;
    device.url = createDeviceDto.url;

    return await device.save();
  }

  async findAll(): Promise<Device[]> {
    return await this.deviceModel.findAll();
  }

  async findOne(id: number) : Promise<Device> {
    return await this.deviceModel.findByPk(id);
  }
}
