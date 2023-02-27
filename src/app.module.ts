import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { dataSoureOptions } from '../db/data-source';
import { UsersModule } from './users/users.module';
import { PhraseModule } from './phrase/phrase.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { CurationsModule } from './curations/curations.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSoureOptions), BooksModule, UsersModule, PhraseModule, HashtagModule, CurationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
