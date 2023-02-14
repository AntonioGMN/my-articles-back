import { Articles } from 'src/articles/articles.entity';
import { Token } from 'src/token/token.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 100 })
  password: string;

  @OneToOne(() => Token, (token) => token.user)
  token: Token;

  @OneToMany(() => Articles, (articles) => articles.user)
  articles: Articles[];
}
