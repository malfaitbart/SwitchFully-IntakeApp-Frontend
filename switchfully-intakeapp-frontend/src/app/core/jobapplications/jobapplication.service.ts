import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { JobApplication } from './classes/jobapplication';
import { Observable } from 'rxjs';
import { ApiUrl } from '../apiUrl/apiUrl';
import { tap } from 'rxjs/operators';
import { JobApplicationCreate } from './classes/jobapplicationCreate';

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

  getJobApplications(): Observable<JobApplication[]>{
    return this.http.get<JobApplication[]>(ApiUrl.urlJobApplications).pipe(
      tap(jp => { console.log('fetched all jobapplications')}),
    );
  }

  getById(id: string): Observable<JobApplication> {
    const url = `${ApiUrl.urlJobApplications}/${id}`;
        return this.http.get<JobApplication>(url)
      .pipe(
        tap(() => { console.log(`fetched by jobapplicationid = ${id}`) }),
      );
  }

  createJobApplication(jobapplication: JobApplicationCreate): Observable<JobApplicationCreate> {
    return this.http.post<JobApplicationCreate>(ApiUrl.urlJobApplications, jobapplication, httpOptions).pipe(
      tap(() => console.log('jobapplication added'))
    )
  }

}
