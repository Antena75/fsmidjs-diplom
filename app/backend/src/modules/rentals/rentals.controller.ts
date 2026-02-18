import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards, SetMetadata } from '@nestjs/common';
import { JwtGuard, RolesGuard } from 'src/modules/auth.guard';
import { ID } from '../type.id';
import { RentalDto } from './interfaces/Rental';
import { RentalsService } from './rentals.service';
import { DeleteResult } from 'typeorm';
import { RentalEntity } from './rental.entity';
import { SerializeUser } from './decorators/serialize';
import { UserEntity } from '../users/user.entity';

@UseGuards(JwtGuard, RolesGuard)
@Controller('api/rentals')
export class RentalsController {
  constructor(private rentalsService: RentalsService) {}

  @Post()
  @SetMetadata('roles', ['client']) 
  createRental(
    @Body() rentalDto: RentalDto,
    @SerializeUser() cUser: UserEntity
  ): Promise<RentalEntity> {
    return this.rentalsService.createRental(rentalDto, cUser);
  }

  @Delete(':id')
  @SetMetadata('roles', ['manager'])
  removeRental(
    @Param('id') rentalId: ID,
  ): Promise<DeleteResult> {
    return this.rentalsService.removeRental(
      rentalId
    );
  }

  @Get()
  searchRentals(
    @Query() searchParams: Partial<RentalDto>,
  ): Promise<RentalEntity[]> {
    return this.rentalsService.searchRentals(searchParams);
  }
}