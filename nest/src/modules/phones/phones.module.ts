import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PhonesService } from './phones.service';
import { PhonesController } from './phones.controller';
import { PhonesEntity } from './phones.entity';

@Module({
  imports: [SequelizeModule.forFeature([PhonesEntity])],
  controllers: [PhonesController],
  providers: [PhonesService],
  exports: [PhonesService],
})
export class PhonesModule {}
