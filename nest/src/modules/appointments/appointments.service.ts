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

  async findAllByStoreId(storeId: string) {
    return await this.appointmentModel.findAll({
      where: { storeId },
      include: [
        { model: Customer },
        { model: Store },
        { model: DeviceModel },
        { model: Fault },
      ],
    });
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

    // Update date, time, and other basic fields
    appointment.date = updateAppointmentDto.date || appointment.date;
    appointment.time = updateAppointmentDto.time || appointment.time;

    // Update customer details
    if (updateAppointmentDto.firstName || updateAppointmentDto.lastName) {
      appointment.customer.firstName =
        updateAppointmentDto.firstName || appointment.customer.firstName;
      appointment.customer.lastName =
        updateAppointmentDto.lastName || appointment.customer.lastName;
      await appointment.customer.save(); // Save the customer changes
    }

    // Update device model name
    if (updateAppointmentDto.deviceModelName) {
      appointment.deviceModel.name = updateAppointmentDto.deviceModelName;
      await appointment.deviceModel.save(); // Save the device model changes
    }

    // Update fault name
    if (updateAppointmentDto.faultName) {
      appointment.fault.name = updateAppointmentDto.faultName;
      await appointment.fault.save(); // Save the fault changes
    }

    // Update store name
    if (updateAppointmentDto.storeName) {
      appointment.store.name = updateAppointmentDto.storeName;
      await appointment.store.save(); // Save the store changes
    }

    console.log('Data before saving:', {
      date: appointment.date,
      time: appointment.time,
      customerId: appointment.customerId,
      storeId: appointment.storeId,
      deviceModelId: appointment.deviceModelId,
      faultId: appointment.faultId,
    });

    try {
      const updatedAppointment = await appointment.save();
      console.log('Updated Appointment:', updatedAppointment);
      return updatedAppointment;
    } catch (error) {
      console.error('Error while saving appointment:', error);
      throw new Error('Failed to update appointment');
    }
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
