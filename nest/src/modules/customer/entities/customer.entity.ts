import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'customer_details' })
export class CustomerDetails extends Model<CustomerDetails> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  customer_id: number;
  @Column({
    type: DataType.STRING(255),
    allowNull: false, 
  })
  customer_fname: string;
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  customer_lname: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  customer_email: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  customer_phone: string;
}
