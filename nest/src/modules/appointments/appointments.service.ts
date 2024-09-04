import { Injectable, NotFoundException, Logger } from '@nestjs/common';
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
  private readonly logger = new Logger(AppointmentsService.name);

  constructor(
    @InjectModel(Appointment)
    private readonly appointmentModel: typeof Appointment,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    this.logger.log(
      'Creating a new appointment',
      JSON.stringify(createAppointmentDto),
    );
    try {
      const appointment =
        await this.appointmentModel.create(createAppointmentDto);
      this.logger.log(
        `Appointment created successfully with ID ${appointment.id}`,
      );
      return appointment;
    } catch (error) {
      this.logger.error('Error creating appointment', error.stack);
      throw new Error('Failed to create appointment');
    }
  }

  async findAllByStoreId(storeId: number | null): Promise<Appointment[]> {
    this.logger.log(`Fetching appointments for storeId: ${storeId}`);
    const where = storeId ? { storeId } : null;
    return await this.appointmentModel.findAll({
      where,
      include: [
        { model: Customer },
        { model: Store },
        { model: DeviceModel },
        { model: Fault },
      ],
    });
  }

  async findAll(): Promise<Appointment[]> {
    this.logger.log('Fetching all appointments');
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
    this.logger.log(`Fetching appointment with ID ${id}`);
    const appointment = await this.appointmentModel.findByPk(id, {
      include: [
        { model: Customer },
        { model: Store },
        { model: DeviceModel },
        { model: Fault },
      ],
    });
    if (!appointment) {
      this.logger.warn(`Appointment with ID ${id} not found`);
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return appointment;
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    this.logger.log(
      `Updating appointment with ID ${id}`,
      JSON.stringify(updateAppointmentDto),
    );
    const appointment = await this.findOne(id);
    if (!appointment) {
      this.logger.warn(`Appointment with ID ${id} not found`);
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
      await appointment.customer.save();
    }

    // Update device model name
    if (updateAppointmentDto.deviceModelName) {
      appointment.deviceModel.name = updateAppointmentDto.deviceModelName;
      await appointment.deviceModel.save();
    }

    // Update fault name
    if (updateAppointmentDto.faultName) {
      appointment.fault.name = updateAppointmentDto.faultName;
      await appointment.fault.save();
    }

    // Update store name
    if (updateAppointmentDto.storeName) {
      appointment.store.name = updateAppointmentDto.storeName;
      await appointment.store.save();
    }

    try {
      const updatedAppointment = await appointment.save();
      this.logger.log(`Appointment with ID ${id} updated successfully`);
      return updatedAppointment;
    } catch (error) {
      this.logger.error('Error updating appointment', error.stack);
      throw new Error('Failed to update appointment');
    }
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Deleting appointment with ID ${id}`);
    const appointment = await this.findOne(id);
    if (!appointment) {
      this.logger.warn(`Appointment with ID ${id} not found`);
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    await appointment.destroy();
    this.logger.log(`Appointment with ID ${id} deleted successfully`);
  }

  async updateIsArchived(
    id: number,
    isArchived: boolean,
  ): Promise<Appointment> {
    this.logger.log(
      `Updating archive status of appointment with ID ${id} to ${isArchived}`,
    );
    const appointment = await this.findOne(id);
    appointment.isArchived = isArchived;
    await appointment.save();
    this.logger.log(
      `Archive status of appointment with ID ${id} updated successfully`,
    );
    return appointment;
  }
}
