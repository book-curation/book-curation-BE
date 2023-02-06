import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { AccountStatus, User } from './entity/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.userId = createUserDto.userId
        user.password = createUserDto.password
        user.name = createUserDto.name
        user.status = AccountStatus.ACTIVE
        
        return this.userRepository.save(user)
    }

    
}
