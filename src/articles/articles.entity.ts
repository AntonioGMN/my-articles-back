import { Users } from 'src/users/dto/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Articles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250 })
  title: string;

  @Column({ length: 250 })
  url: string;

  @ManyToOne(() => Users, (user) => user.articles)
  user: Users;
}
