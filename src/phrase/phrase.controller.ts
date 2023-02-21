import { Body, Controller, Post } from '@nestjs/common';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { PhraseService } from './phrase.service';

@Controller('phrase')
export class PhraseController {
  constructor(private readonly phraseService: PhraseService) {}

  @Post()
  create(@Body() createPhraseDto: CreatePhraseDto) {
    return this.phraseService.create(createPhraseDto);
  }
}
