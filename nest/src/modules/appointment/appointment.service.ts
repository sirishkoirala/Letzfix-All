import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment)
    private readonly AppointmentModel: typeof Appointment,
  ) {}

  async findAll(): Promise<Appointment[]> {
    return this.AppointmentModel.findAll();
  }

  async findOne(id: number): Promise<Appointment> {
    return this.AppointmentModel.findByPk(id);
  }

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    return this.AppointmentModel.create({
      date: createAppointmentDto.date,
      time: createAppointmentDto.time,
    });
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    const appointment = await this.findOne(id);
    if (!appointment) {
      return null; 
    }
    return appointment.update(updateAppointmentDto);
  }

  async remove(id: number): Promise<boolean> {
    const appointment = await this.AppointmentModel.findByPk(id);
    if (!appointment) {
      return false;
    }
    await appointment.destroy();
    return true;
  }
}
