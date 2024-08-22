import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Customer } from 'src/modules/customers/entities/customer.entity';
import { DeviceModel } from 'src/modules/device-models/entities/device-model.entity';
import { Fault } from 'src/modules/faults/entities/fault.entity';
import { Store } from 'src/modules/stores/entities/store.entity';


@Table({ tableName: 'appointments' })
export class Appointment extends Model<Appointment> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  date: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  time: string;

  @ForeignKey(() => Customer)
  @Column
  customerId: number;

  @ForeignKey(() => Store)
  @Column
  storeId: number;

  @ForeignKey(() => DeviceModel)
  @Column
  deviceModelId: number;

  @ForeignKey(() => Fault)
  @Column
  faultId: number;
}
