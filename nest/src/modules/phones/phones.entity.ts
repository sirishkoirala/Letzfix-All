import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { PhoneModelEntity } from '../phone-models/phone-models.entity';

@Table({ tableName: 'phones' })
export class PhonesEntity extends Model<PhonesEntity> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  url: string;

  @HasMany(() => PhoneModelEntity)
  models: PhoneModelEntity[];
}
