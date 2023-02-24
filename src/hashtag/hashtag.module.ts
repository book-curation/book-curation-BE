import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from '../books/books.module';
import { HashtagController } from './hashtag.controller';
import { HashtagService } from './hashtag.service';
import { UsersModule } from '../users/users.module';
import { Hashtag } from './entity/hashtag.entity';
import { Book } from '../books/entity/book.entity';
import { User } from '../users/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hashtag, Book, User]), forwardRef(() => BooksModule), UsersModule],
  controllers: [HashtagController],
  providers: [HashtagService],
  exports: [HashtagService],
})
export class HashtagModule {}
