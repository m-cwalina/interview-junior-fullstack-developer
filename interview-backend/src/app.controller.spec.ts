import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { readFileSync } from 'fs';

jest.mock('fs');

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getCities', () => {
    it('should return filtered cities', () => {
      const mockCities = [
        { cityName: 'Berlin' },
        { cityName: 'Hamburg' },
        { cityName: 'Darmstadt' },
      ];

      (
        readFileSync as jest.MockedFunction<typeof readFileSync>
      ).mockReturnValue(JSON.stringify(mockCities));

      const result = appController.getCities(1, 2, 'Berlin');

      expect(result).toEqual({
        total: 1,
        cities: [{ cityName: 'Berlin' }],
      });
    });
  });
});

// import { Test, TestingModule } from '@nestjs/testing';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// describe('AppController', () => {
//   let appController: AppController;

//   beforeEach(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//       controllers: [AppController],
//       providers: [AppService],
//     }).compile();

//     appController = app.get<AppController>(AppController);
//   });

//   describe('root', () => {
//     it('should return "Hello World!"', () => {
//       expect(appController.getHello()).toBe('Hello World!');
//     });
//   });
// });
