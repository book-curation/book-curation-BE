import { forwardRef, Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashtagService } from '../hashtag/hashtag.service';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Book } from './entity/book.entity';
import { Hashtag } from '../hashtag/entity/hashtag.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,

    @Inject(forwardRef(() => HashtagService))
    private readonly hashtagService: HashtagService,
  ) {}

  async findById(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: {
        id,
      },
      relations: ['hashtag'],
    });

    if (!book) {
      throw new NotFoundException('Book does not exist');
    }

    return book;
  }

  async recommendBooks(count: number = 3): Promise<Book[]> {
    const bookList = await this.bookRepository
      .createQueryBuilder('book')
      .select(['book.title', 'book.author'])
      .orderBy('RANDOM()')
      .limit(count)
      .getMany();

    return bookList;
  }

  async getBookByHashtagId(hashtagId: number): Promise<object[]> {
    await this.hashtagService.findById(hashtagId);

    const result = await this.hashtagRepository.find({
      where: {
        id: hashtagId,
      },
      relations: ['books'],
    });

    let bookList = [];
    result[0].books.map(book =>
      bookList.push({
        id: book.id,
        title: book.title,
        author: book.author,
      }),
    );

    return bookList;
  }
}
