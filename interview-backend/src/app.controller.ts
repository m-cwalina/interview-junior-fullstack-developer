import { Controller, Get, Query } from '@nestjs/common';
import { readFileSync } from 'fs';

@Controller()
export class AppController {
  @Get('cities')
  getCities(
    @Query('page') page = 1,
    @Query('limit') limit = 5,
    @Query('search') search = '',
  ): any {
    const citiesData = JSON.parse(readFileSync('../cities.json', 'utf-8'));
    const filteredCities = citiesData.filter((city) =>
      city.cityName.toLowerCase().startsWith(search.toLowerCase()),
    );

    const start = (page - 1) * limit;
    const end = page * limit;

    return {
      total: filteredCities.length,
      cities: filteredCities.slice(start, end),
    };
  }
}
