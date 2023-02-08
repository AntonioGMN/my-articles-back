import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';
import { UniqueEmail } from './validations/uniqueEmail';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [...usersProviders, UniqueEmail, UsersService],
  exports: [UsersService, UniqueEmail],
})
export class UsersModule {}
