import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from '../books/books.module';
import { HashtagController } from './hashtag.controller';
import { HashtagService } from './hashtag.service';
import { UsersModule } from '../users/users.module';
import { Hashtag } from './entity/hashtag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hashtag]), BooksModule, UsersModule],
  controllers: [HashtagController],
  providers: [HashtagService],
})
export class HashtagModule {}
