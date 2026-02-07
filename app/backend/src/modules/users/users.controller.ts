import { Body, Controller, Get, Post, Query, UseGuards, SetMetadata } from '@nestjs/common';
import { JwtGuard, RolesGuard } from '../auth.guard';
import { SearchUsersDto } from './interfaces/search.user';
import { Users } from './users.schema';
import { UsersService } from './users.service';
import { RegisterUserDto } from './interfaces/register.user';
import { ReturnDataDto } from '../auth/interfaces/returndata';

@Controller('api/users')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) {}

  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  @SetMetadata('roles', ['admin', 'manager']) 
  searchUsers(
    @Query() params: Partial<SearchUsersDto>,
  ): Promise<Users[]> {
    return this.usersService.search(params);
  }

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @SetMetadata('roles', ['admin']) 
  signUpAdmin(
    @Body() dataReg: RegisterUserDto): Promise<ReturnDataDto> {   
    return this.usersService.register(dataReg);
  }

  @Post('/register')
  signUpClient(
    @Body() dataReg: RegisterUserDto): Promise<ReturnDataDto> {   
    return this.usersService.register(dataReg);
  }
}

