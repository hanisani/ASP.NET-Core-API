import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/lib/services/user.service';
import { User } from 'src/lib/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { Messages } from 'src/lib/utils/messages';
import { Router } from '@angular/router';
import { ToastrOptions } from 'src/lib/utils/constants';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User;
  formRegistration: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router
    ) { }

  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      this.router.navigateByUrl('/home');
    }
    this.createForm();
    this.formRegistration.reset();
  }

  createForm() {
    this.formRegistration = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.email, Validators.maxLength(30)]],
      fullname: ['', Validators.maxLength(30)],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
      // confirmPassword: ['', Validators.required, this.comparePasswords.bind(this)]
    });
  }

  comparePasswords(confirmPassword: FormControl) {
    const password = this.formRegistration.controls.password;
    if (this.formRegistration) {
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({
          passwordMismatch: true
        });
      }
    } else {
      confirmPassword.setErrors(null);
    }
  }

  onSubmit() {
    this.user = this.formRegistration.value as User;
    this.userService.register(this.user).subscribe((result: any) => {
      if (result) {
        this.formRegistration.reset();
        this.toastrService.success(Messages.USER_CREATED, Messages.SUCCESS, {
          timeOut: ToastrOptions.TimeOut
        });
      }
    }, () => {
      this.toastrService.error(Messages.USER_ALREADY_EXISTS, Messages.ERROR, {
        timeOut: ToastrOptions.TimeOut
      });
    });
  }

}
