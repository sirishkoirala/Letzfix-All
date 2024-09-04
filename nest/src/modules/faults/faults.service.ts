import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFaultDto } from './dto/create-fault.dto';
import { UpdateFaultDto } from './dto/update-fault.dto';
import { Fault } from './entities/fault.entity';

@Injectable()
export class FaultsService {
  private readonly logger = new Logger(FaultsService.name);

  constructor(
    @InjectModel(Fault)
    private readonly faultModel: typeof Fault,
  ) {}

  async create(createFaultDto: CreateFaultDto): Promise<Fault> {
    this.logger.log('Creating a new fault');

    const fault = new Fault();
    fault.name = createFaultDto.name;
    fault.deviceId = createFaultDto.deviceId;

    const newFault = await fault.save();
    this.logger.log(`Fault created with ID: ${newFault.id}`);
    return newFault;
  }

  async findAll(): Promise<Fault[]> {
    this.logger.log('Fetching all faults');

    const faults = await this.faultModel.findAll();
    // this.logger.log(`Fetched ${faults.length} faults`);
    return faults;
  }

  async findOne(id: number): Promise<Fault> {
    this.logger.log(`Fetching fault with ID: ${id}`);

    const fault = await this.faultModel.findByPk(id);

    if (!fault) {
      this.logger.warn(`Fault with ID ${id} not found`);
    }
    return fault;
  }
}
