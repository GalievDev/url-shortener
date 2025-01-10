import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('urls')
export class UrlEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalUrl: string;

  @Column({ unique: true })
  shortUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  expiresAt: Date;

  @Column({ default: 0 })
  clickCount: number;

  @Column('json', { default: [] })
  transitions: { date: Date; ip: string }[];
}
