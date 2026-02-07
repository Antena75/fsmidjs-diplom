import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards, SetMetadata } from '@nestjs/common';
import { JwtGuard, RolesGuard } from 'src/modules/auth.guard';
import { ID } from '../type.id';
import { RentalDto } from './interfaces/Rental';
import { RentalsService } from './rentals.service';
import { RentalsDocument } from './rentals.schema';

@UseGuards(JwtGuard, RolesGuard)
@Controller('api/rentals')
export class RentalsController {
  constructor(private rentalsService: RentalsService) {}

  @Post()
  @SetMetadata('roles', ['client']) 
  createRental(
    @Body() rentalDto: RentalDto,
  ): Promise<RentalsDocument> {
    return this.rentalsService.createRental(rentalDto);
  }

  @Delete(':id')
  @SetMetadata('roles', ['manager'])
  removeRental(
    @Param('id') rentalId: ID,
  ): Promise<RentalsDocument> {
    return this.rentalsService.removeRental(
      rentalId
    );
  }

  @Get()
  searchRentals(
    @Query() searchParams: Partial<RentalDto>,
  ): Promise<RentalsDocument[]> {
    return this.rentalsService.searchRentals(searchParams);
  }
}
