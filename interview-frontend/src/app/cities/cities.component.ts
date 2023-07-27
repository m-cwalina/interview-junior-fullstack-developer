import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  cities: any;

  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    this.http.get('http://localhost:3000/cities').subscribe((data) => {
      this.cities = data;
      console.log(data)
    }, (error) => {
      console.error('There was an error!', error);
    });
  }
}
