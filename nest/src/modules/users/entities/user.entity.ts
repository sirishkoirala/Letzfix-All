import { Table, Column, Model, DataType, Default } from 'sequelize-typescript';

@Table({
  tableName: 'users',
//   timestamps: true, // Automatically manage createdAt and updatedAt fields
})
export class User extends Model<User> {
  @Column({
    type: DataType.NUMBER,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  passwordHash: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  invitationCode: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
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
}
