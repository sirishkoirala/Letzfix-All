import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { Customer } from '../customers/entities/customer.entity';
import { DeviceModel } from '../device-models/entities/device-model.entity';
import { Store } from '../stores/entities/store.entity';
import { Fault } from '../faults/entities/fault.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment)
    private readonly appointmentModel: typeof Appointment,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const appointment =
      await this.appointmentModel.create(createAppointmentDto);
    return appointment;
  }

  async findAll(): Promise<Appointment[]> {
    return await this.appointmentModel.findAll({
      include: [
        { model: Customer },
        { model: Store },
        { model: DeviceModel },
        { model: Fault },
      ],
    });
  }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentModel.findByPk(id, {
      include: [
        { model: Customer },
        { model: Store },
        { model: DeviceModel },
        { model: Fault },
      ],
    });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return appointment;
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    console.log('UpdateAppointmentDto:', updateAppointmentDto);

    const appointment = await this.findOne(id);
    if (!appointment) {
      console.log(`Appointment with ID ${id} not found`);
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    console.log('Original Appointment:', appointment);

    appointment.date = updateAppointmentDto.date || appointment.date;
    appointment.time = updateAppointmentDto.time || appointment.time;
    appointment.customerId =
      updateAppointmentDto.customerId || appointment.customerId;
    appointment.storeId = updateAppointmentDto.storeId || appointment.storeId;
    appointment.deviceModelId =
      updateAppointmentDto.deviceModelId || appointment.deviceModelId;
    appointment.faultId = updateAppointmentDto.faultId || appointment.faultId;

    const updatedAppointment = await appointment.save();

    console.log('Updated Appointment:', updatedAppointment);

    return updatedAppointment;
  }

  async remove(id: number): Promise<void> {
    const appointment = await this.findOne(id);
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    await appointment.destroy();
  }

  async updateIsArchived(
    id: number,
    isArchived: boolean,
  ): Promise<Appointment> {
    const appointment = await this.findOne(id);
    appointment.isArchived = isArchived;
    await appointment.save();
    return appointment;
  }
}
