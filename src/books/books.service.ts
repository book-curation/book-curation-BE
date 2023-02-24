import { forwardRef, Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashtagService } from '../hashtag/hashtag.service';
import { Repository } from 'typeorm';
import { Book } from './entity/book.entity';
import { Hashtag } from '../hashtag/entity/hashtag.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

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

    const books = await this.hashtagService.findBookByHashtag(hashtagId);

    let bookList = [];
    books.map(book =>
      bookList.push({
        id: book.id,
        title: book.title,
        author: book.author,
      }),
    );

    return bookList;
  }

  async findHashtagByBook(bookId: number): Promise<Hashtag[]> {
    const result = await this.bookRepository.find({
      where: {
        id: bookId,
      },
      relations: ['hashtag'],
    });

    return result[0].hashtag;
  }
}
