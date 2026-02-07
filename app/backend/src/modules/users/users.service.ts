import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from '../type.id';
import { CreateUserDto } from './interfaces/create.user';
import { SearchUsersDto } from './interfaces/search.user';
import { Users, UsersDocument } from './users.schema';
import { RegisterUserDto } from './interfaces/register.user';
import { ReturnDataDto } from '../auth/interfaces/returndata';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<Users>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,) {}

  async create(createUserDto: CreateUserDto): Promise<UsersDocument> {
    try {
      const user = new this.usersModel(createUserDto);
      return user.save();
    } catch (e) {
      console.error(e);
    }
  }

  async search(params: Partial<SearchUsersDto>): Promise<UsersDocument[]> {
    const { limit, offset, email, name, contactPhone } = params;
    const query = {
      email: { $regex: new RegExp(email, 'i') },
      name: { $regex: new RegExp(name, 'i') },
      contactPhone: { $regex: new RegExp(contactPhone, 'i') },
    };
    return await this.usersModel.find(query).limit(limit || 0).skip(offset || 0)
  }

  async findById(id: ID): Promise<UsersDocument> {
    const user = await this.usersModel.findById(id);
    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    }
    return user;
  }

  async findByEmail(email: string): Promise<UsersDocument> | null {
    const user = await this.usersModel.findOne({ email });
    return user;
  }

  async register(dataReg: RegisterUserDto): Promise<ReturnDataDto> {
    const { email, password, name, contactPhone, role } = dataReg;
    const user = await this.findByEmail(dataReg.email);
    if (user) {
      throw new NotFoundException('Пользователь уже зарегистрирован!');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await this.create({
      email,
      passwordHash,
      name,
      contactPhone: contactPhone,
      role: role || 'client'
    });
    this.userRepo.save({
      email,
      hash: passwordHash,
      name,
      contactPhone: contactPhone,
      role: role || 'client'
    })
    return { id: newUser.id, email: newUser.email, name: newUser.name};
  }
}
