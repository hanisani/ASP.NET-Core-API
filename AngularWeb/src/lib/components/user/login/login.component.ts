import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/lib/models/user.model';
import { UserService } from 'src/lib/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Messages } from 'src/lib/utils/messages';
import { Router } from '@angular/router';
import { LoginService } from 'src/lib/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  user: User;
  formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      this.router.navigateByUrl('/home');
    }
    this.createForm();
    this.formLogin.reset();
  }

  createForm() {
    this.formLogin = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
    });
  }

  onSubmit() {
    this.user = this.formLogin.value as User;
    this.userService.login(this.user).subscribe((result: any) => {
      if (result) {
        localStorage.setItem('token', result.token);
        this.loginService.setLoggedIn(true);
        this.router.navigateByUrl('/home');
      }
    }, () => {
      this.toastrService.error(Messages.USER_NOT_FOUND, Messages.ERROR, {
        timeOut: 3000
      });
    });
  }

}
