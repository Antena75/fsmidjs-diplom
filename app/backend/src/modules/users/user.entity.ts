import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ID } from '../type.id';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: ID;

  @Column()
  name: string;

  @Column()
  contactPhone: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  hash: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 'client' })
  role: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

}

export class UserEntity {
  id: string;
  name: string;
  contactPhone: string;
  role: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date; 

  @Exclude()
  hash: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
