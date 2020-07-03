import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/lib/services/user.service';
import { User } from 'src/lib/models/user.model';

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
    private userService: UserService
    ) { }

  ngOnInit() {
    this.createForm();
    this.formRegistration.reset();
  }

  createForm() {
    this.formRegistration = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      fullname: [''],
      Passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      }, {
        validators: this.comparePasswords
      })
    });
  }

  comparePasswords(fb: FormGroup) {
    const password = fb.controls.password as FormControl;
    const confirmPassword = fb.controls.confirmPassword as FormControl;
    if (confirmPassword.errors === null || 'passwordMismatch' in confirmPassword.errors) {
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({
          passwordMismatch: true
        });
      } else {
        confirmPassword.setErrors(null);
      }
    }
  }

  onSubmit() {
    this.user = this.formRegistration.value as User;
    this.userService.register(this.user).subscribe((result: any) => {
      console.log(result);
      if (result && result.succeeded) {
        this.formRegistration.reset();
      }
    }, (error) => {
      console.log(error);
    });
  }

}
