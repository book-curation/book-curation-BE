import { Body, Controller, Get, Param, Patch, Post, Query, Delete } from '@nestjs/common';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { UpdatePhraseDto } from './dto/update-phrase.dto';
import { PhraseService } from './phrase.service';

@Controller('phrase')
export class PhraseController {
  constructor(private readonly phraseService: PhraseService) {}

  @Post()
  create(@Body() createPhraseDto: CreatePhraseDto) {
    return this.phraseService.create(createPhraseDto);
  }

  @Get('recommend')
  recommendPhrase(@Query('count') count: number) {
    return this.phraseService.recommendPhrase(count);
  }

  @Get()
  getPhrase(@Query('bookId') bookId: number) {
    return this.phraseService.getPhrase(bookId);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePhraseDto: UpdatePhraseDto) {
    return this.phraseService.update(id, updatePhraseDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Body('userId') userId: string) {
    return this.phraseService.delete(id, userId);
  }
}
