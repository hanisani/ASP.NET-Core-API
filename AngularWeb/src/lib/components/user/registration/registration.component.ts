import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/lib/services/user.service';
import { User } from 'src/lib/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { Messages } from 'src/lib/utils/messages';

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
    private toastrService: ToastrService
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
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
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
          timeOut: 3000
        });
      }
    }, () => {
      this.toastrService.error(Messages.USER_ALREADY_EXISTS, Messages.ERROR, {
        timeOut: 3000
      });
    });
  }

}
