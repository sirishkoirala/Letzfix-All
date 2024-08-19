import { Injectable, Inject } from '@nestjs/common';
import { Devices } from './devices.entity';
import { CreateDevicesDto, UpdateDevicesDto } from './dto/devices.dto';

@Injectable()
export class DevicesService {
  constructor(
    @Inject('DEVICES_REPOSITORY')
    private readonly devicesRepository: typeof Devices,
  ) {}

  create(createDeviceDto: CreateDevicesDto): Promise<Devices> {
    return this.devicesRepository.create(createDeviceDto);
  }

  findAll(): Promise<Devices[]> {
    return this.devicesRepository.findAll();
  }

  findOne(id: string): Promise<Devices> {
    return this.devicesRepository.findOne({
      where: { id },
    });
  }

  update(
    id: string,
    updateDevicesDto: UpdateDevicesDto,
  ): Promise<[number, Devices[]]> {
    return this.devicesRepository.update(updateDevicesDto, {
      where: { id },
      returning: true,
    });
  }

  delete(id: string): Promise<number> {
    return this.devicesRepository.destroy({
      where: { id },
    });
  }
}
