import { Body, Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.usersService.checkPassword(loginDto.userId, loginDto.password);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  resetPassword(@Param('id') id: string, @Body() resetPasswordDto: ResetPasswordDto) {
    return this.usersService.resetPassword(id, resetPasswordDto);
  }

  @Delete()
  delete(@Body() loginDto: LoginDto) {
    return this.usersService.delete(loginDto.userId, loginDto.password);
  }
}
