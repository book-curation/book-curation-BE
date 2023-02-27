import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CurationsService } from './curations.service';
import { CreateCurationDto } from './dto/create-curation.dto';
import { UpdateCurationDto } from './dto/update-curation.dto';

@Controller('curations')
export class CurationsController {
  constructor(private readonly curationService: CurationsService) {}

  @Post()
  create(@Body() createCurationDto: CreateCurationDto) {
    return this.curationService.create(createCurationDto);
  }

  @Get('recommend')
  recommendCurations(@Query('count') count: number) {
    return this.curationService.recommendCuration(count);
  }

  @Get()
  getCurationList(@Query('userId') userId: string): any {
    return this.curationService.getCurationList(userId);
  }

  @Get(':id')
  getCuration(@Param('id') id: number) {
    return this.curationService.findById(id);
  }

  @Patch()
  update(@Body() updateCurationDto: UpdateCurationDto) {
    return this.curationService.update(updateCurationDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Body('userId') userId: string) {
    return this.curationService.delete(userId, id);
  }
}
