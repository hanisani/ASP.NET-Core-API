import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from 'src/lib/components/user/user.component';
import { RegistrationComponent } from 'src/lib/components/user/registration/registration.component';


const routes: Routes = [
  {
    path: '', redirectTo: '/user/registration', pathMatch: 'full'
  },
  {
    path: 'user', component: UserComponent,
    children: [
      {
        path: 'registration', component: RegistrationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
