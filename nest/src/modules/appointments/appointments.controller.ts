import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  // @Get()
  // findAll() {
  //   return this.appointmentsService.findAll();
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAppointments(@Request() req) {
    const storeId = req.user.storeId; 
    const allAppointments = await this.appointmentsService.findAll();
    const filteredAppointments = allAppointments.filter(
      (appointment) => appointment.storeId === storeId,
    );
    return filteredAppointments;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    const storeId = req.user.storeId;
    const appointment = await this.appointmentsService.findOne(+id);
    if (appointment.storeId !== storeId) {
      throw new NotFoundException('Appointment not found for this store');
    }
    return appointment;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto, @Request() req) {
    createAppointmentDto.storeId = req.user.storeId;
    return this.appointmentsService.create(createAppointmentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
    @Request() req,
  ): Promise<Appointment> {
    const storeId = req.user.storeId;
    const appointment = await this.appointmentsService.findOne(id);
    if (appointment.storeId !== storeId) {
      throw new NotFoundException('Appointment not found for this store');
    }
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    const storeId = req.user.storeId;
    const appointment = await this.appointmentsService.findOne(+id);
    if (appointment.storeId !== storeId) {
      throw new NotFoundException('Appointment not found for this store');
    }
    return this.appointmentsService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/archive')
  async updateIsArchived(
    @Param('id') id: string,
    @Body('isArchived') isArchived: boolean,
    @Request() req,
  ) {
    const storeId = req.user.storeId;
    const appointment = await this.appointmentsService.findOne(+id);
    if (appointment.storeId !== storeId) {
      throw new NotFoundException('Appointment not found for this store');
    }
    return this.appointmentsService.updateIsArchived(Number(id), isArchived);
  }
}
