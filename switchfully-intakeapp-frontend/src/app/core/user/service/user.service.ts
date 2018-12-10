import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggedOnUser } from '../classes/user';
import { ApiUrl } from '../../apiUrl/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getcurrent() {
      return this.http.get<LoggedOnUser>(`${ApiUrl.urlUsers}current`);
  }
}
