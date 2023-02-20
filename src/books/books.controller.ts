import { Controller, Get, Param, Query } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('recommend')
  recommendBooks(@Query('count') count: number) {
    return this.booksService.recommendBooks(count);
  }

  @Get(':id')
  getBook(@Param('id') id: number) {
    return this.booksService.findById(id);
  }
}
