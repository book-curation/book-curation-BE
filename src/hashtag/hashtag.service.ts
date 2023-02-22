import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { BooksService } from '../books/books.service';
import { UsersService } from '../users/users.service';
import { Hashtag } from './entity/hashtag.entity';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
    private readonly booksService: BooksService,
    private readonly usersService: UsersService,
  ) {}

  async create(createHashtagDto: CreateHashtagDto): Promise<string> {
    const book = await this.booksService.findById(createHashtagDto.bookId);
    const user = await this.usersService.findById(createHashtagDto.userId);

    await Promise.all(
      createHashtagDto.content.map(async content => {
        const existingHashtag = await this.hashtagRepository.findOneBy({ content });
        if (!existingHashtag) {
          const hashtag = new Hashtag();
          hashtag.content = content;
          hashtag.books = [book];
          hashtag.users = [user];

          await this.hashtagRepository.save(hashtag);
        }
      }),
    );

    return 'Hashtags successfully created';
  }
}
