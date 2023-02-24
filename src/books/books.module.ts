import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hashtag } from '../hashtag/entity/hashtag.entity';
import { HashtagModule } from '../hashtag/hashtag.module';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './entity/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Hashtag]), forwardRef(() => HashtagModule)],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
