import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ID } from '../type.id';

@Entity()
export class Library {
  @PrimaryGeneratedColumn('uuid')
  id: ID;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  description: string;

  @Column({type: 'text', array: true, default: []})
  images: string[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

export class LibraryEntity {
  id: ID;
  name: string;
  address: string;
  description: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date; 

  constructor(partial: Partial<LibraryEntity>) {
    Object.assign(this, partial);
  }
}
