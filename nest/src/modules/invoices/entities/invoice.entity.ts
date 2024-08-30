import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Appointment } from 'src/modules/appointments/entities/appointment.entity';
import { Customer } from 'src/modules/customers/entities/customer.entity';
import { InvoiceItem } from 'src/modules/invoice-items/entities/invoice-item.entity';
import { Store } from 'src/modules/stores/entities/store.entity';

@Table({ tableName: 'invoices' })
export class Invoice extends Model<Invoice> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Appointment)
  @Column({
    type: DataType.INTEGER, 
  })
  appointmentId: number;

  @BelongsTo(() => Appointment, 'appointmentId')
  appointment: Appointment;

  @ForeignKey(() => Customer)
  @Column({
    type: DataType.INTEGER, 
  })
  customerId: number;

  @BelongsTo(() => Customer, 'customerId')
  customer: Customer;

  @ForeignKey(() => Store)
  @Column({
    type: DataType.INTEGER, 
  })
  storeId: number;

  @BelongsTo(() => Store, 'storeId')
  store: Store;

  @HasMany(() => InvoiceItem)
  invoiceItems: InvoiceItem[];
}

