import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Candidate } from './candidate';
import { Observable } from 'rxjs';
import { ApiUrl } from '../apiUrl/apiUrl';
@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(
    private http: HttpClient
  ) { }

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(ApiUrl.urlCandidates);
  }
}
