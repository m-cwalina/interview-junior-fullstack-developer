import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  constructor(private http: HttpClient) { }

  getCities(page: number, limit: number, search: string): Observable<any> {
    return this.http.get(`http://localhost:3000/cities`, { params: { page, limit, search } })
      .pipe(
        catchError(error => {
          console.error('Problem loading cities data', error);
          return throwError(error);
        })
      );
  }
}
