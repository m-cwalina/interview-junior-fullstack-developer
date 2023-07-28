import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadCities();
  }

  searchTerm: string = '';

  loadCities(): void {
    this.http.get(`http://localhost:3000/cities?page=${this.page}&limit=${this.limit}&search=${this.searchTerm}`).subscribe((data: any) => {
      this.cities = data.cities;
      this.total = data.total;
    }, (error) => {
      console.error('There was an error!', error);
    });
  }
  
  onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.loadCities();
  }

  pageEvent(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.loadCities();
  }
}
