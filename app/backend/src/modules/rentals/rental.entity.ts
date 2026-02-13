import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ID, RentalStatus } from '../type.id';

@Entity()
export class Rental {
  @PrimaryGeneratedColumn('uuid')
  id: ID;

  @Column()
  userId: ID;

  @Column()
  libraryId: ID;

  @Column()
  bookId: ID;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  dateStart: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  dateEnd: Date;

  @Column({ default: "reserved" })
  status: RentalStatus;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

export class RentalEntity {
  id: ID;
  userId: ID;
  libraryId: ID;
  bookId: ID;
  dateStart: Date;
  dateEnd: Date;
  status: RentalStatus;
  createdAt: Date;
  libraryName: string;
  bookName: string;

  constructor(partial: Partial<RentalEntity>) {
    Object.assign(this, partial);
  }
}