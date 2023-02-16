import { Users } from '../users/dto/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  token: string;

  @OneToOne(() => Users, (user) => user.token, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: Users;
}
