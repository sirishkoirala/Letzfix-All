import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'stores' })
export class Store extends Model<Store> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column
  address1: string;

  @Column
  address2: string;

  @Column
  city: string;

  @Column
  state: string;

  @Column
  country: string;

  @Column
  postcode: string;

  @Column
  phone: string;
}
