import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Device } from 'src/modules/devices/entities/device.entity';

@Table({ tableName: 'faults' })
export class Fault extends Model<Fault> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @ForeignKey(() => Device)
  @Column
  deviceId: number;
}
