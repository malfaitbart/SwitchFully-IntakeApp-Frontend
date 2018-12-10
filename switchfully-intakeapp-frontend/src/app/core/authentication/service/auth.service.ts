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
  private currentUserTokenSubject: BehaviorSubject<UserAuth>;
  public currentUserToken: Observable<UserAuth>;

  constructor(private http: HttpClient) {
      this.currentUserTokenSubject = new BehaviorSubject<UserAuth>(JSON.parse(sessionStorage.getItem('currentUserToken')));
      this.currentUserToken = this.currentUserTokenSubject.asObservable();
  }

  public get currentUserTokenValue(): UserAuth {
    return this.currentUserTokenSubject.value;
  }

  login(email: string, password: string) {
      return this.http.post<any>(`${ApiUrl.urlUsers}authenticate`, { email, password })
          .pipe(map(user => {console.log(user)
              if (user) {                
                  sessionStorage.setItem('currentUserToken', JSON.stringify(user));
                  this.currentUserTokenSubject.next(user);
              }
              return user;
          }));
  }

  logout() {     
      sessionStorage.removeItem('currentUserToken');
      this.currentUserTokenSubject.next(null);
  }
}