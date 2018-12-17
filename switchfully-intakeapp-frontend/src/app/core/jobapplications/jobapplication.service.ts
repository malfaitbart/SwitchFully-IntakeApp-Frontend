import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { JobApplication } from './classes/jobapplication';
import { Observable, throwError } from 'rxjs';
import { ApiUrl } from '../apiUrl/apiUrl';
import { tap, catchError, map } from 'rxjs/operators';
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

  getJobApplications(): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(ApiUrl.urlJobApplications).pipe(
      tap(jp => { console.log('fetched all jobapplications') }),
      catchError(this.handleError)
    );
  }

  getById(id: string): Observable<JobApplication> {
    return this.http.get<JobApplication>(`${ApiUrl.urlJobApplications}${id}`)
      .pipe(
        tap(() => { console.log(`fetched by jobapplicationid = ${id}`) }),
        catchError(this.handleError)
      );
  }

  uploadFile(file: FormData, doctype:string): Observable<string>{
    const toUpload = {
      type:doctype,
      doc:file
    }
    console.log(toUpload);
    return this.http.post<string>(ApiUrl.urlJobApplicationsUpload, toUpload)
    .pipe(
      tap(() => {console.log(`uploaded file`)}),
      catchError(this.handleError)
      );
  }

  createJobApplication(jobapplicationCreate: FormData): Observable<JobApplicationCreate> {
    console.log(jobapplicationCreate);
    return this.http.post<JobApplicationCreate>(ApiUrl.urlJobApplications, jobapplicationCreate, httpOptions).pipe(
      tap(() => console.log('jobapplication added')),
      catchError(this.handleError)
    )
  }

  rejectJobApplications(givenId: string){
    return this.http.put<JobApplication>(`${ApiUrl.urlJobApplications}reject/id:string?id=${givenId}`,"rejected",httpOptions )
    .pipe(
        tap(() =>  console.log(`rejected campaignId = ${givenId}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
