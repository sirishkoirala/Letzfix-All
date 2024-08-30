import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }

  @Patch(':id') 
  async update(
    @Param('id') id: number,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    console.log('Controller: update appointment');

    try {
      const updatedAppointment = await this.appointmentsService.update(
        id,
        updateAppointmentDto,
      );
      console.log(
        'Updated appointment returned from service:',
        updatedAppointment,
      );
      return updatedAppointment;
    } catch (error) {
      console.error('Error in controller:', error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Appointment with ID ${id} not found`);
      }
      throw new Error('Failed to update appointment');
    }
  }
  @Patch(':id')
  async updateIsArchived(
    @Param('id') id: string,
    @Body('isArchived') isArchived: boolean,
  ) {
    return await this.appointmentsService.updateIsArchived(
      Number(id),
      isArchived,
    );
  }
}
