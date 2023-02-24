import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { HashtagService } from './hashtag.service';

@Controller('hashtag')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Post()
  create(@Body() createHashtagDto: CreateHashtagDto) {
    return this.hashtagService.create(createHashtagDto);
  }

  @Get()
  getHashtagByBookId(@Query('bookId') bookId: number) {
    return this.hashtagService.getHashtagByBookId(bookId);
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Body('userId') userId: string) {
    await this.hashtagService.deleteHashtagByUser(id, userId);

    await this.hashtagService.delete(id);

    return 'Hashtag successfully deleted';
  }
}
