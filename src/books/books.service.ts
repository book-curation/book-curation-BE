import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Book } from './entity/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
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
}
