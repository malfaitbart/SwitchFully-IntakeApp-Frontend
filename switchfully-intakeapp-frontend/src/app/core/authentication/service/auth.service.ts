import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserAuth } from '../classes/userAuth';
import { ApiUrl } from '../../apiUrl/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserAuth>;
  public currentUser: Observable<UserAuth>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<UserAuth>(JSON.parse(sessionStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserAuth {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
      return this.http.post<any>(`${ApiUrl.urlUsers}authenticate`, { email, password })
          .pipe(map(user => {console.log(user)
              if (user) {                
                  sessionStorage.setItem('currentUser', JSON.stringify(user));
                  this.currentUserSubject.next(user);
              }
              return user;
          }));
  }

  logout() {     
      sessionStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }
}