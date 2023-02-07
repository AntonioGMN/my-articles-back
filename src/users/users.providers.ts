import { DataSource } from 'typeorm';
import { Users } from './dto/users.entity';

export const usersProviders = [
  {
    provide: 'Users_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Users),
    inject: ['DATA_SOURCE'],
  },
];
