import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Screening } from './classes/Screening';
import { ApiUrl } from '../apiUrl/apiUrl';
import { tap } from 'rxjs/operators';
import { NewScreening } from './classes/newScreening';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ScreeningService {

  constructor(
    private http: HttpClient
  ) { }


  getAllScreeningsings(id: string): Observable<Screening[]> {
    return this.http.get<Screening[]>(`${ApiUrl.urlScreenings}${id}`).pipe(
      tap(() => { console.log('fetched all Screenings') }),
    );
  }

  submitComment(id: string, value: NewScreening): Observable<Screening[]> {
    return this.http.post<Screening[]>(`${ApiUrl.urlScreenings}${id}`, value, httpOptions).pipe(
      tap(() => { console.log('fetched all Screenings') }),
    );
  }
}




