import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { JobApplication } from './classes/jobapplication';
import { Observable } from 'rxjs';
import { ApiUrl } from '../apiUrl/apiUrl';
import { tap } from 'rxjs/operators';
import { JobApplicationCreate  } from './classes/jobapplicationCreate';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class JobapplicationService {

  constructor(
    private http: HttpClient
  ) { }

  getJobApplications(): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(ApiUrl.urlJobApplications).pipe(
      tap(jp => { console.log('fetched all jobapplications') }),
    );
  }

  getById(id: string): Observable<JobApplication> {
    return this.http.get<JobApplication>(`${ApiUrl.urlJobApplications}${id}`)
      .pipe(
        tap(() => { console.log(`fetched by jobapplicationid = ${id}`) }),
      );
  }

  createJobApplication(jobapplication: JobApplicationCreate): Observable<JobApplication> {
    return this.http.post<JobApplication>(ApiUrl.urlJobApplications, jobapplication, httpOptions).pipe(
      tap(() => console.log('jobapplication added'))
    )
  }

  rejectJobApplications(givenId: string){
    return this.http.put<JobApplication>(`${ApiUrl.urlJobApplications}reject/id:string?id=${givenId}`,"rejected",httpOptions )
    .pipe(
        tap(() =>  console.log(`rejected campaignId = ${givenId}`) )        
      );
  }
}
