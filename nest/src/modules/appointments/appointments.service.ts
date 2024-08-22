import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment)
    private readonly appointmentModel: typeof Appointment,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const appointment = new Appointment();
    appointment.date = createAppointmentDto.date;
    appointment.time = createAppointmentDto.time;
    appointment.customerId = createAppointmentDto.customerId;
    appointment.storeId = createAppointmentDto.storeId;
    appointment.deviceModelId = createAppointmentDto.deviceModelId;
    appointment.faultId = createAppointmentDto.faultId;

    return await appointment.save();
  }

  async findAll(): Promise<Appointment[]> {
    return await this.appointmentModel.findAll();
  }

  async findOne(id: number): Promise<Appointment> {
    return await this.appointmentModel.findByPk(id);
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    const appointment = await this.findOne(id);
    if (!appointment) {
      throw new Error(`Appointment with ID ${id} not found`);
    }
    appointment.date = updateAppointmentDto.date || appointment.date;
    appointment.time = updateAppointmentDto.time || appointment.time;
    appointment.customerId =
      updateAppointmentDto.customerId || appointment.customerId;
    appointment.storeId = updateAppointmentDto.storeId || appointment.storeId;
    appointment.deviceModelId =
      updateAppointmentDto.deviceModelId || appointment.deviceModelId;
    appointment.faultId = updateAppointmentDto.faultId || appointment.faultId;

    return await appointment.save();
  }

  async remove(id: number): Promise<void> {
    const appointment = await this.findOne(id);
    if (appointment) {
      await appointment.destroy();
    }
  }
}
