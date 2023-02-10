import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LinksModule } from './articles/articles.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, LinksModule],
})
export class AppModule {}
