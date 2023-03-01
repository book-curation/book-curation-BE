import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from '../books/books.module';
import { UsersModule } from '../users/users.module';
import { CurationsController } from './curations.controller';
import { CurationsService } from './curations.service';
import { Curation } from './entity/curation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Curation]), BooksModule, UsersModule],
  controllers: [CurationsController],
  providers: [CurationsService],
})
export class CurationsModule {}
