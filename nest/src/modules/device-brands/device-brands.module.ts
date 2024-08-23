import { Module } from '@nestjs/common';
import { DeviceBrandsService } from './device-brands.service';
import { DeviceBrandsController } from './device-brands.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DeviceBrand } from './entities/device-brand.entity';
import { DeviceModel } from '../device-models/entities/device-model.entity';

@Module({
  imports: [SequelizeModule.forFeature([DeviceBrand,DeviceModel])],
  controllers: [DeviceBrandsController],
  providers: [DeviceBrandsService],
})
export class DeviceBrandsModule {}
