import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { BooksService } from '../books/books.service';
import { UsersService } from '../users/users.service';
import { Hashtag } from './entity/hashtag.entity';
import { Book } from '../books/entity/book.entity';
import { ForbiddenException, NotFoundException } from '@nestjs/common/exceptions';
import { User } from '../users/entity/user.entity';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,

    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

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
    const book = await this.booksService.findById(bookId);

    const result = await this.bookRepository.find({
      where: {
        id: bookId,
      },
      relations: ['hashtag'],
    });

    let hashtagList = [];
    result[0].hashtag.map(tag => hashtagList.push(tag.content));

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

    const user = await this.usersService.findById(userId);
    user.hashtag = user.hashtag.filter(tag => {
      return tag.id != hashtagId;
    });

    return this.userRepository.save(user);
  }

  async delete(hashtagId: number): Promise<DeleteResult> {
    const hashtag = await this.findById(hashtagId);

    let deleteHashtag;
    if (hashtag.users.length == 0) {
      deleteHashtag = this.hashtagRepository.delete(hashtagId);
    }

    return deleteHashtag;
  }
}
