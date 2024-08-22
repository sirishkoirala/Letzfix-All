import { Module } from '@nestjs/common';
import { DeviceModelsService } from './device-models.service';
import { DeviceModelsController } from './device-models.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DeviceModel } from './entities/device-model.entity';

@Module({
  imports: [SequelizeModule.forFeature([DeviceModel])],
  controllers: [DeviceModelsController],
  providers: [DeviceModelsService],
})
export class DeviceModelsModule {}
