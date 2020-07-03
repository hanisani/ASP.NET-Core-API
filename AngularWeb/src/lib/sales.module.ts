import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './components/user/user.component';
import { RegistrationComponent } from './components/user/registration/registration.component';



@NgModule({
  declarations: [UserComponent, RegistrationComponent],
  imports: [
    CommonModule
  ]
})
export class SalesModule { }
