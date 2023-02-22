import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { dataSoureOptions } from '../db/data-source';
import { UsersModule } from './users/users.module';
import { PhraseModule } from './phrase/phrase.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSoureOptions), BooksModule, UsersModule, PhraseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
