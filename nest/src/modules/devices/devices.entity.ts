import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
// import { Fault } from './../faults/entities/fault.entity';

@Table({ tableName: 'devices' })
export class Devices extends Model<Devices> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  })
  id: string;

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

  // @HasMany(() => Fault)
  // faults: Fault[];
}
