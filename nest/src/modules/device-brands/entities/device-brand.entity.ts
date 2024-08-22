import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { DeviceModel } from 'src/modules/device-models/entities/device-model.entity';

@Table({ tableName: 'device_brands' })
export class DeviceBrand extends Model<DeviceBrand> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column
  image: string;

  @Column
  url: string;

  @HasMany(() => DeviceModel)
  models: DeviceModel[];
}
