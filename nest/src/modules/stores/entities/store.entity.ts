import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'stores' })
export class Store extends Model<Store> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  store_id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  store_city: string;

  @Column({
   type: DataType.STRING(255),
   allowNull: false,
  })
  store_address: string;
}
