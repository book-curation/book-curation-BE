import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { Phrase } from './entity/phrase.entity';
import { BooksService } from '../books/books.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class PhraseService {
  constructor(
    @InjectRepository(Phrase)
    private readonly phraseRepository: Repository<Phrase>,
    private readonly booksService: BooksService,
    private readonly usersService: UsersService,
  ) {}

  async create(createPhraseDto: CreatePhraseDto) {
    const book = await this.booksService.findById(createPhraseDto.bookId);
    const user = await this.usersService.findById(createPhraseDto.userId);

    const phrase = new Phrase();
    phrase.content = createPhraseDto.content;
    (phrase.book = book), (phrase.user = user);
    return this.phraseRepository.save(phrase);
  }
}
