import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
