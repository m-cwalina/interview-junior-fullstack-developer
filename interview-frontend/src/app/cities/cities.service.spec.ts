import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CitiesService } from './cities.service';

describe('CitiesService', () => {
  let service: CitiesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CitiesService]
    });

    service = TestBed.inject(CitiesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch cities with proper parameters', () => {
    const mockResponse = {
      cities: [{ name: 'City 1' }, { name: 'City 2' }],
      total: 2
    };

    const params = {
      page: 1,
      limit: 5,
      search: 'Test City'
    };

    service.getCities(params.page, params.limit, params.search).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`http://localhost:3000/cities?page=${params.page}&limit=${params.limit}&search=${encodeURIComponent(params.search)}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should throw an error when the server returns an error', () => {
    const errorEvent = new ErrorEvent('Network error', {
      message: 'Some network error'
    });

    service.getCities(1, 5, 'Test City').subscribe(
      () => fail('should have failed with a network error'),
      (error) => expect(error.error.message).toEqual('Some network error')
    );

    const req = httpMock.expectOne(`http://localhost:3000/cities?page=1&limit=5&search=Test%20City`);
    req.error(errorEvent);
  });
});
