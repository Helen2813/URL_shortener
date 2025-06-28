import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Click {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shortCode: string;

  @Column()
  ip: string;

  @CreateDateColumn()
  timestamp: Date;
}
