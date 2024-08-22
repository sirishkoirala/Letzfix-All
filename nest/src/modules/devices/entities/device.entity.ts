import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'devices' })
export class Device extends Model<Device> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column
  image : string;

  @Column
  url : string;
}
