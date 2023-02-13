import { Users } from 'src/users/dto/users.entity';
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

  @OneToOne(() => Users, (user) => user.token)
  @JoinColumn({ name: 'userId' })
  user: Users;
}
