import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})

export class CitiesComponent implements OnInit {
  cities: any;
  page: number = 1;
  limit: number = 5;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities(): void {
    this.http.get(`http://localhost:3000/cities?page=${this.page}&limit=${this.limit}`).subscribe((data: any) => {
      this.cities = data.cities;
    }, (error) => {
      console.error('There was an error!', error);
    });
  }

  nextPage(): void {
    this.page++;
    this.loadCities();
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadCities();
    }
  }
}
