import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http'
import { JobApplication } from './classes/jobapplication';
import { Observable, throwError } from 'rxjs';
import { ApiUrl } from '../apiUrl/apiUrl';

import { tap, catchError, map } from 'rxjs/operators';
import { JobApplicationCreate } from './classes/jobapplicationCreate';
import { JobApplicationOverview } from './classes/jobapplicationoverview';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class JobapplicationService {
  result: JobApplicationCreate;
  constructor(
    private http: HttpClient
  ) { }

  getJobApplications(): Observable<JobApplicationOverview[]> {
    return this.http.get<JobApplicationOverview[]>(ApiUrl.urlJobApplications).pipe(
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

  getDocument(targeturl, docName) {
    this.http.get(targeturl, { responseType: 'blob' as 'json' }).subscribe(
      (response: any) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        document.body.appendChild(downloadLink);
        downloadLink.download = docName;
        downloadLink.click();
      }
    );
  }

  createJobApplication(jobapplication: JobApplicationCreate): Observable<JobApplication> {
    return this.http.post<JobApplication>(ApiUrl.urlJobApplications, jobapplication, httpOptions).pipe(
      tap(() => console.log('jobapplication added'))
    )
  }

  rejectJobApplications(givenId: string) {
    return this.http.put<JobApplication>(`${ApiUrl.urlJobApplications}reject/id:string?id=${givenId}`, "rejected", httpOptions)
      .pipe(
        tap(() => console.log(`rejected campaignId = ${givenId}`)),
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
