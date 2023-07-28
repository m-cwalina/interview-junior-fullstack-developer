import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CitiesService } from './cities.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  cities: any;
  page: number = 1;
  limit: number = 5;
  total: number = 0;
  searchTerm: string = '';
  errorMessage: string = '';

  constructor(private citiesService: CitiesService) { }

  ngOnInit(): void {
    this.loadCities(this.page, this.limit, this.searchTerm);
  }

  loadCities(page: number, limit: number, search: string) {
    this.citiesService.getCities(page, limit, search).subscribe(
      data => {
        this.cities = data.cities;
        this.total = data.total;
      },
      error => {
        this.errorMessage = 'There was a problem loading cities data';
      }
    );
  }

  onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.loadCities(this.page, this.limit, this.searchTerm);
  }

  pageEvent(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.loadCities(this.page, this.limit, this.searchTerm);
  }
}
