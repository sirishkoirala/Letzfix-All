import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PhoneModelEntity } from '../phone-model/phone-model.entity';

@Entity('phones')
export class PhonesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  url: string;

  @OneToMany(() => PhoneModelEntity, (model) => model.phone)
  models: PhoneModelEntity[];
}
