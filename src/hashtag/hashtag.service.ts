import { forwardRef, Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { BooksService } from '../books/books.service';
import { UsersService } from '../users/users.service';
import { Hashtag } from './entity/hashtag.entity';
import { Book } from '../books/entity/book.entity';
import { NotFoundException } from '@nestjs/common/exceptions';
import { User } from '../users/entity/user.entity';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,

    @Inject(forwardRef(() => BooksService))
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

  async getHashtagByBookId(bookId: number): Promise<string[]> {
    await this.booksService.findById(bookId);

    const hashtags = await this.booksService.findHashtagByBook(bookId);

    let hashtagList = [];
    hashtags.map(tag => hashtagList.push(tag.content));

    return hashtagList;
  }

  async findById(hashtagId: number): Promise<Hashtag> {
    const hashtag = await this.hashtagRepository.findOne({
      where: {
        id: hashtagId,
      },
      relations: ['users'],
    });
    if (!hashtag) {
      throw new NotFoundException('Hashtag does not exist.');
    }
    return hashtag;
  }

  async deleteHashtagByUser(hashtagId: number, userId: string): Promise<User> {
    await this.findById(hashtagId);

    return this.usersService.deleteHashtag(hashtagId, userId);
  }

  async delete(hashtagId: number): Promise<DeleteResult> {
    const hashtag = await this.findById(hashtagId);

    let deleteHashtag;
    if (hashtag.users.length == 0) {
      deleteHashtag = this.hashtagRepository.delete(hashtagId);
    }

    return deleteHashtag;
  }

  async findBookByHashtag(hashtagId: number): Promise<Book[]> {
    const result = await this.hashtagRepository.find({
      where: {
        id: hashtagId,
      },
      relations: ['books'],
    });

    return result[0].books;
  }
}
