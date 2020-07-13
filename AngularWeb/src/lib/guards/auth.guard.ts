import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  canActivate(): boolean {
    let val = false;
    this.loginService.getLoggedIn().subscribe(value => {
      const isTokenExists = localStorage.getItem('token') !== null;
      if (value || isTokenExists) {
        this.loginService.setLoggedIn(true);
        val = true;
      } else {
        this.router.navigate(['/user/login']);
        val = false;
      }
    });
    return val;
  }
}
