import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { readFileSync } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('cities')
  getCities(@Query('page') page = 1, @Query('limit') limit = 5): any {
    const citiesData = JSON.parse(readFileSync('../cities.json', 'utf-8'));
    const start = (page - 1) * limit;
    const end = page * limit;

    return {
      total: citiesData.length,
      cities: citiesData.slice(start, end),
    };
  }
}
