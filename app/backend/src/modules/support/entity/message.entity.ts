import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'
import { ID } from '../../type.id';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: ID;

  @Column()
  authorId: ID;

  @Column()
  text: string;  
  
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  sentAt: Date;

  @Column({ type: 'timestamptz', default: null })
  readAt: Date;
}

export class MessageEntity {
  id: ID;
  authorId: ID;
  text: string; 
  sentAt: Date;
  readAt: Date;

  constructor(partial: Partial<MessageEntity>) {
    Object.assign(this, partial);
  }
}
