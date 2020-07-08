import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:54060/';

  constructor(
    private httpClient: HttpClient
  ) { }

  register(user: User) {
    return this.httpClient.post(this.baseUrl + 'api/user/register', user);
  }

  login(user: User) {
    return this.httpClient.post(this.baseUrl + 'api/user/login', user);
  }

  getUser() {
    const tokenHeader = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('token')
    });
    return this.httpClient.get(this.baseUrl + 'api/user/one', {
      headers: tokenHeader
    });
  }

}
