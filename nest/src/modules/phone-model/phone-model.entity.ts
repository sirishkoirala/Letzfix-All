import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { PhonesEntity } from '../phones/phones.entity';

@Entity('phone_models')
export class PhoneModelEntity {
  @PrimaryGeneratedColumn()
  model_id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @ManyToOne(() => PhonesEntity, phone => phone.models)
  phone: PhonesEntity;
}
