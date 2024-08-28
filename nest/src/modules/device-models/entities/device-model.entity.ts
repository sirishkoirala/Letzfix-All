import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DeviceBrand } from 'src/modules/device-brands/entities/device-brand.entity';

@Table({ tableName: 'device_models' })
export class DeviceModel extends Model<DeviceModel> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @ForeignKey(() => DeviceBrand)
  @Column
  deviceBrandId: number;

  @BelongsTo(() => DeviceBrand)
  deviceBrand: DeviceBrand;
}
