import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/modules/auth.guard';
import { AuthService } from './auth.service';
import { ReturnDataDto } from './interfaces/returndata';
import { LoginDto } from './interfaces/login';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  signIn(@Body() loginDto: LoginDto): Promise<ReturnDataDto> {
    return this.authService.login(loginDto);
  }

  @Get('/checkauth')
  @UseGuards(JwtGuard)
  checkAuth(
    @Query() data: { email: string },
  ): Promise<{ role: string; id: string }> {
    return this.authService.checkAuth(data);
  }
}
