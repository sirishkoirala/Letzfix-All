import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFaultDto } from './dto/create-fault.dto';
import { UpdateFaultDto } from './dto/update-fault.dto';
import { Fault } from './entities/fault.entity';

@Injectable()
export class FaultsService {
  constructor(
    @InjectModel(Fault)
    private readonly faultModel: typeof Fault,
  ) {}

  async create(createFaultDto: CreateFaultDto): Promise<Fault> {
    const fault = new Fault();
    fault.name = createFaultDto.name;
    fault.deviceId = createFaultDto.deviceId;

    return await fault.save();
  }

  async findAll(): Promise<Fault[]> {
    return await this.faultModel.findAll();
  }

  async findOne(id: number): Promise<Fault> {
    return await this.faultModel.findByPk(id);
  }

  
}
