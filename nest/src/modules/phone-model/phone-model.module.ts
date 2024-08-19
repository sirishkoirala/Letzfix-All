import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneModelService } from './phone-model.service';
import { PhoneModelEntity } from './phone-model.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneModelEntity])],
  providers: [PhoneModelService],
  exports: [PhoneModelService],
})
export class PhoneModelModule {}
