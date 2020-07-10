import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { BaseURL } from '../utils/constants';
import { Helper } from '../utils/helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  register(user: User) {
    return this.httpClient.post(BaseURL.URL + 'api/user/register', user);
  }

  login(user: User) {
    return this.httpClient.post(BaseURL.URL + 'api/user/login', user);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }

  getUser() {
    return this.httpClient.get(BaseURL.URL + 'api/user/one', {
      headers: Helper.getHeaders()
    });
  }

  isAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

}
