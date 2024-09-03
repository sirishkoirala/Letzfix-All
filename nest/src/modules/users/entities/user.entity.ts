import { Table, Column, Model, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Store } from 'src/modules/stores/entities/store.entity';

@Table({
  tableName: 'users',
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(255),
    // allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING(255),
    // allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING(255),
    // allowNull: false,
    // unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING(255),
    // allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING(255),
    // allowNull: true,
  })
  invitationCode: string;

  @Column({
    type: DataType.DATE,
    // allowNull: true,
  })
  invitationCodeExpiresAt: Date;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  isVerified: boolean;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @ForeignKey(() => Store)
  @Column
  storeId: number;

  @BelongsTo(() => Store)
  store: Store;
}
