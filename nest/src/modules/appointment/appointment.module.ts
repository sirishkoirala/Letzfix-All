import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Appointment } from './entities/appointment.entity';

@Module({
  imports: [SequelizeModule.forFeature([Appointment])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
