import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class smartphones extends Model<smartphones> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column
  image: string;

  @Column
  url: string;
}
