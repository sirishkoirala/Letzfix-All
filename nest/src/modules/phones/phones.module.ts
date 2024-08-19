import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhonesService } from './phones.service';
import { PhonesEntity } from './phones.entity';
import { PhoneModelModule } from '../phone-model/phone-model.module';

@Module({
  imports: [TypeOrmModule.forFeature([PhonesEntity]), PhoneModelModule],
  providers: [PhonesService],
  exports: [PhonesService],
})
export class PhonesModule {}
