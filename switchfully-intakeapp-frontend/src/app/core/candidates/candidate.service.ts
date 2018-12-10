import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Candidate } from './candidate';
import { Observable } from 'rxjs';
import { ApiUrl } from '../apiUrl/apiUrl';
import { tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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

  createCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(ApiUrl.urlCandidates, candidate, httpOptions).pipe(
      tap((candidate: Candidate) => console.log('candidate added'))
    )
  }
}
