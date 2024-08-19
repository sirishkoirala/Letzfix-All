import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { smartphones } from './smartphones.entity';
import { SmartPhonesService } from './smartphones.service';
import { SmartPhoneController } from './smartphones.controller';
import { smartPhonesProviders } from './smartphones.providers';

@Module({
  imports: [SequelizeModule.forFeature([smartphones])],
  providers: [SmartPhonesService, ...smartPhonesProviders],
  controllers: [SmartPhoneController],
})
export class SmartPhonesModule {}
