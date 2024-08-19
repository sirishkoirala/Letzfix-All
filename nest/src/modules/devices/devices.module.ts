import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Devices } from './devices.entity';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { devicesProviders } from './devices.providers';

@Module({
  imports: [SequelizeModule.forFeature([Devices])],
  providers: [DevicesService, ...devicesProviders],
  controllers: [DevicesController],
})
export class DevicesModule {}
