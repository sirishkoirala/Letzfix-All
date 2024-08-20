import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { PhonesEntity } from '../phones/phones.entity';

@Table({ tableName: 'phone_models' })
export class PhoneModelEntity extends Model<PhoneModelEntity> {
  @Column({ primaryKey: true, autoIncrement: true })
  model_id: number;

  @Column
  name: string;

  @Column
  url: string;

  @ForeignKey(() => PhonesEntity)
  @Column
  phoneId: number;
}
