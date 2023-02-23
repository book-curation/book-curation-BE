import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { AccountStatus, User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.isIdExist(createUserDto.userId);

    const user = new User();
    user.userId = createUserDto.userId;
    user.password = await this.hashPassword(createUserDto.password);
    user.name = createUserDto.name;
    user.status = AccountStatus.ACTIVE;
    return this.userRepository.save(user);
  }

  async isIdExist(userId: string): Promise<boolean> {
    const user = await this.userRepository.findBy({ userId });
    if (user.length != 0) {
      throw new ConflictException('User id already exist');
    }
    return true;
  }

  async findById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        userId,
      },
      relations: ['hashtag'],
    });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return user;
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltOrRounds);

    return hashPassword;
  }

  async checkPassword(userId: string, password: string): Promise<User> {
    const user = await this.findById(userId);
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }

    return user;
  }

  async resetPassword(userId: string, resetPasswordDto: ResetPasswordDto): Promise<User> {
    const user = await this.checkPassword(userId, resetPasswordDto.password);

    const newHashPassword = await this.hashPassword(resetPasswordDto.newPassword);

    user.password = newHashPassword;

    return this.userRepository.save(user);
  }

  async delete(userId: string, password: string): Promise<DeleteResult> {
    const user = await this.checkPassword(userId, password);
    return this.userRepository.delete(user.id);
  }
}
