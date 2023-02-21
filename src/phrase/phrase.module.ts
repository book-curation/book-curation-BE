import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from '../books/books.module';
import { Phrase } from './entity/phrase.entity';
import { PhraseController } from './phrase.controller';
import { PhraseService } from './phrase.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Phrase]), BooksModule, UsersModule],
  providers: [PhraseService],
  controllers: [PhraseController],
})
export class PhraseModule {}
