import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ID } from '../type.id';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: ID;

  @Column()
  library: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  year: number;

  @Column()
  description: string;

  @Column({ type: 'text', array: true, default: [] })
  images: string[];

  @Column({ default: true })
  isAvailable: boolean;
  
  @Column({ default: 1 })
  totalCopies: number;
  
  @Column({ default: 1 })
  availableCopies: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

export class BookEntity {
  id: ID;
  library: string;
  title: string;
  author: string;
  year: number;
  description: string;
  images: string[];
  isAvailable: boolean;
  totalCopies: number;
  availableCopies: number;
  createdAt: Date;
  updatedAt: Date; 

  constructor(partial: Partial<BookEntity>) {
    Object.assign(this, partial);
  }
}
