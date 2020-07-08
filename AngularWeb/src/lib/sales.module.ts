import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './components/user/user.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { LoginComponent } from './components/user/login/login.component';
import { HomeComponent } from './components/home/home.component';



@NgModule({
  declarations: [UserComponent, RegistrationComponent, LoginComponent, HomeComponent],
  imports: [
    CommonModule
  ]
})
export class SalesModule { }
