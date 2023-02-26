import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { Phrase } from './entity/phrase.entity';
import { BooksService } from '../books/books.service';
import { UsersService } from '../users/users.service';
import { UpdatePhraseDto } from './dto/update-phrase.dto';

@Injectable()
export class PhraseService {
  constructor(
    @InjectRepository(Phrase)
    private readonly phraseRepository: Repository<Phrase>,
    private readonly booksService: BooksService,
    private readonly usersService: UsersService,
  ) {}

  async create(createPhraseDto: CreatePhraseDto): Promise<Phrase> {
    const book = await this.booksService.findById(createPhraseDto.bookId);
    const user = await this.usersService.findById(createPhraseDto.userId);

    const phrase = new Phrase();
    phrase.content = createPhraseDto.content;
    (phrase.book = book), (phrase.user = user);
    return this.phraseRepository.save(phrase);
  }

  async getPhrase(bookId: number): Promise<Phrase[]> {
    const book = await this.booksService.findById(bookId);

    return this.phraseRepository.findBy({ book });
  }

  async findById(phraseId: number): Promise<Phrase> {
    const phrase = await this.phraseRepository.findOneBy({ id: phraseId });
    if (!phrase) {
      throw new NotFoundException('Phrase does not exist');
    }
    return phrase;
  }

  async update(phraseId: number, updatePhraseDto: UpdatePhraseDto): Promise<Phrase> {
    const phrase = await this.findById(phraseId);
    if (updatePhraseDto.userId !== phrase.user.userId) {
      throw new ForbiddenException('User id does not match');
    }

    phrase.content = updatePhraseDto.content;
    return this.phraseRepository.save(phrase);
  }

  async delete(phraseId: number, userId: string): Promise<DeleteResult> {
    const phrase = await this.findById(phraseId);
    if (userId !== phrase.user.userId) {
      throw new ForbiddenException('User id does not match');
    }

    return this.phraseRepository.delete(phraseId);
  }

  async recommendPhrase(count: number = 3): Promise<Phrase[]> {
    const phraseList = await this.phraseRepository
      .createQueryBuilder('phrase')
      .leftJoinAndSelect('phrase.book', 'book')
      .select(['phrase.id', 'phrase.content', 'book.id'])
      .orderBy('RANDOM()')
      .limit(count)
      .getMany();

    return phraseList;
  }
}
