import { Injectable, NotFoundException } from '@nestjs/common';
import { ID } from '../type.id';
import { CreateUserDto } from './interfaces/create.user';
import { SearchUsersDto } from './interfaces/search.user';
import { RegisterUserDto } from './interfaces/register.user';
import { ReturnDataDto } from '../auth/interfaces/returndata';
import { User, UserEntity } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>) {}
  async create(createUserDto: CreateUserDto): Promise<UserEntity>  {
    try {
      const user = await this.userRepo.save(createUserDto);
      return new UserEntity(user); 
    } catch (e) {
      console.error(e);
    }
  }

  async search(params: Partial<SearchUsersDto>): Promise<UserEntity[]> {
    const { limit, offset, email, name, contactPhone } = params;
    return await this.userRepo.find({
      where: { 
        email: Like (`%${email}%`),
        name: Like (`%${name}%`),
        contactPhone: Like (`%${contactPhone}%`),
      },
      skip: offset,
      take: limit
    });
  }

  async findById(id: ID): Promise<UserEntity> {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity> | null {
    const user = await this.userRepo.findOne({
      where: { email },
      select: {
        id: true,
        hash: true,
        email: true,
        name: true,
        role: true,
        contactPhone: true
      }
    });
    return user;
  }

  async register(dataReg: RegisterUserDto): Promise<ReturnDataDto> {
    const { email, password, name, contactPhone, role } = dataReg;
    const user = await this.findByEmail(dataReg.email);
    if (user) {
      throw new NotFoundException('Пользователь уже зарегистрирован!');
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await this.create({
      email,
      hash,
      name,
      contactPhone: contactPhone,
      role: role || 'client'
    });
    return { id: newUser.id, email: newUser.email, name: newUser.name};
  }
}
