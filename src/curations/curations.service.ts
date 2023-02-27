import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksService } from '../books/books.service';
import { UsersService } from '../users/users.service';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCurationDto } from './dto/create-curation.dto';
import { UpdateCurationDto } from './dto/update-curation.dto';
import { Curation } from './entity/curation.entity';

@Injectable()
export class CurationsService {
  constructor(
    @InjectRepository(Curation)
    private readonly curationRepository: Repository<Curation>,
    private readonly booksService: BooksService,
    private readonly usersService: UsersService,
  ) {}

  async create(createCurationDto: CreateCurationDto): Promise<Curation> {
    const user = await this.usersService.findById(createCurationDto.userId);

    let bookList = [];
    await Promise.all(
      createCurationDto.bookIdList.map(async bookId => {
        const book = await this.booksService.findById(bookId);
        bookList.push(book);
      }),
    );

    const curation = new Curation();
    curation.title = createCurationDto.title;
    curation.isPublic = createCurationDto.isPublic;
    curation.user = user;
    curation.books = bookList;

    return this.curationRepository.save(curation);
  }

  async getCurationList(userId: string): Promise<Curation[]> {
    return this.curationRepository.find({
      where: {
        user: {
          userId,
        },
      },
    });
  }

  async findById(curationId: number): Promise<Curation> {
    const curation = await this.curationRepository.findOne({
      where: {
        id: curationId,
      },
      relations: ['books', 'user'],
    });
    if (!curation) {
      throw new NotFoundException('Curation does not exist');
    }
    return curation;
  }

  async update(updatePhraseDto: UpdateCurationDto): Promise<Curation> {
    const curation = await this.findById(updatePhraseDto.curationId);

    if (updatePhraseDto.title) {
      curation.title = updatePhraseDto.title;
    }
    if (updatePhraseDto.isPublic) {
      curation.isPublic = updatePhraseDto.isPublic;
    }
    if (updatePhraseDto.bookIdList) {
      let books = [];
      await Promise.all(
        updatePhraseDto.bookIdList.map(async bookId => {
          const book = await this.booksService.findById(bookId);
          books.push(book);
        }),
      );
      curation.books = books;
    }

    return this.curationRepository.save(curation);
  }

  async delete(userId: string, curationId: number): Promise<DeleteResult> {
    const curation = await this.findById(curationId);

    if (curation.user.userId !== userId) {
      throw new ForbiddenException('User id does not match');
    }

    return this.curationRepository.delete(curationId);
  }

  async recommendCuration(count: number = 3): Promise<Curation[]> {
    const curationList = await this.curationRepository
      .createQueryBuilder('curation')
      .select(['curation.title', 'curation.id'])
      .where('curation.isPublic = :public', { public: true })
      .orderBy('RANDOM()')
      .limit(count)
      .getMany();

    return curationList;
  }
}
