import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { readFileSync } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('cities')
  getCities(): any {
    const citiesData = readFileSync('../cities.json', 'utf-8');
    console.log(citiesData);
    return JSON.parse(citiesData);
  }
}
