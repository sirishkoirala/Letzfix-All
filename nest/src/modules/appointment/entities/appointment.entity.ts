import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'appointment' })
export class Appointment extends Model {
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
  date: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  time: string;
}
