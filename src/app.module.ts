import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { dataSoureOptions } from '../db/data-source';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSoureOptions), BooksModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
