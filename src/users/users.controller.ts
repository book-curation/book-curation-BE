import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post()
    async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        await this.usersService.create(createUserDto)

        return res.status(200).send({ message: 'User successfully created.' })
    }
}
