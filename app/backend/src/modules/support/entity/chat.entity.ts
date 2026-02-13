import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'
import { ID } from '../../type.id';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: ID;

  @Column()
  userId: ID;

  @Column({type: 'text', array: true, default: []})
  messages: ID[]

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

export class ChatEntity {
  id: ID;
  userId: ID;
  messages: ID[];
  isActive: boolean;
  createdAt: Date;
  user: {
    name: string;
    email: string;
    contactPhone: string;
  }

  constructor(partial: Partial<ChatEntity>) {
    Object.assign(this, partial);
  }
}