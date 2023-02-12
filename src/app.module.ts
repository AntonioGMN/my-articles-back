import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, ArticlesModule],
})
export class AppModule {}
