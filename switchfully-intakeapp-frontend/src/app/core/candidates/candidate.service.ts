import { Injectable, ApplicationInitStatus } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Candidate } from './classes/candidate';
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
    return this.http.get<Candidate[]>(ApiUrl.urlCandidates).pipe(
      tap(h => { console.log(`fetched all candidates`) }),
    );
  }

  getById(id: string): Observable<Candidate> {
    // const url = `${ApiUrl.urlCandidates}/${id}`;
    const url = `http://localhost:59089/api/Candidates/${id}`;

        return this.http.get<Candidate>(url)
      .pipe(
        tap(h => { console.log(`fetched by candidateId = ${id}`) }),
      );
  }


  createCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(ApiUrl.urlCandidates, candidate, httpOptions).pipe(
      tap((candidate: Candidate) => console.log('candidate added'))
    )
  }
}
