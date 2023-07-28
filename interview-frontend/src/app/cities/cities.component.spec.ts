import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageEvent } from '@angular/material/paginator';
import { CitiesComponent } from './cities.component';
import { FilterComponent } from '../filter/filter.component';
import { MatPaginatorModule } from '@angular/material/paginator';

describe('CitiesComponent', () => {
  let component: CitiesComponent;
  let fixture: ComponentFixture<CitiesComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatPaginatorModule],
      declarations: [CitiesComponent, FilterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CitiesComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cities on init', () => {
    const mockCities = {
      cities: [{ name: 'City 1' }, { name: 'City 2' }],
      total: 2
    };

    component.ngOnInit();

    const req = httpMock.expectOne(`http://localhost:3000/cities?page=${component.page}&limit=${component.limit}&search=${component.searchTerm}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCities);

    expect(component.cities).toEqual(mockCities.cities);
    expect(component.total).toEqual(mockCities.total);
  });

  it('should handle pageEvent correctly', () => {
    const mockEvent: PageEvent = {
      pageIndex: 2,
      pageSize: 5,
      length: 10
    };

    const mockCities = {
      cities: [],
      total: 0
    };

    component.pageEvent(mockEvent);

    const req = httpMock.expectOne(`http://localhost:3000/cities?page=${component.page}&limit=${component.limit}&search=${component.searchTerm}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCities);

    expect(component.page).toBe(mockEvent.pageIndex + 1);
    expect(component.limit).toBe(mockEvent.pageSize);
  });

  it('should handle onSearch correctly', () => {
    const mockSearchTerm = 'Test city';

    const mockCities = {
      cities: [],
      total: 0
    };

    component.onSearch(mockSearchTerm);

    const req = httpMock.expectOne(`http://localhost:3000/cities?page=${component.page}&limit=${component.limit}&search=${encodeURIComponent(component.searchTerm)}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCities);

    expect(component.searchTerm).toBe(mockSearchTerm);
  });
});
