import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
