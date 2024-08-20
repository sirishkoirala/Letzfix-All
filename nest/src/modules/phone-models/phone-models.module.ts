import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PhoneModelService } from './phone-models.service';
import { PhoneModelController } from './phone-models.controller';
import { PhoneModelEntity } from './phone-models.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([PhoneModelEntity]), 
  ],
  controllers: [PhoneModelController],
  providers: [PhoneModelService],
  exports: [PhoneModelService],
})
export class PhoneModelModule {}
