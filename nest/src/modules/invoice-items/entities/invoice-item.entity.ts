import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Fault } from 'src/modules/faults/entities/fault.entity';
import { Invoice } from 'src/modules/invoices/entities/invoice.entity';
@Table({ tableName: 'invoice-items' })
export class InvoiceItem extends Model<InvoiceItem> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Fault)
  @Column({
    type: DataType.INTEGER, 
  })
  faultId: number;

  @BelongsTo(() => Fault, 'faultId')
  fault: Fault;

  @Column({
    type: DataType.DECIMAL(10, 2), 
  })
  amount: number;

  @Column({
    type: DataType.DECIMAL(10, 2), 
  })
  tax: number;

  @ForeignKey(() => Invoice)
  @Column({
    type: DataType.INTEGER, 
  })
  invoiceId: number;

  @BelongsTo(() => Invoice, 'invoiceId')
  invoice: Invoice;
}

