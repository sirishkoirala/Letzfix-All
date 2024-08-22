import { Module } from '@nestjs/common';
import { DeviceBrandsService } from './device-brands.service';
import { DeviceBrandsController } from './device-brands.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DeviceBrand } from './entities/device-brand.entity';

@Module({
  imports: [SequelizeModule.forFeature([DeviceBrand])],
  controllers: [DeviceBrandsController],
  providers: [DeviceBrandsService],
})
export class DeviceBrandsModule {}
