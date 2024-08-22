import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
// import { Devices } from './../../devices/devices.entity';

@Table({ tableName: 'faults' })
export class Fault extends Model<Fault> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  fault_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

//   @ForeignKey(() => Devices)
//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   device_id: string;

//   @BelongsTo(() => Devices)
//   device: Devices;
}
