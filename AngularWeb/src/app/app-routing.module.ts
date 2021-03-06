import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from 'src/lib/components/user/registration/registration.component';
import { LoginComponent } from 'src/lib/components/user/login/login.component';
import { HomeComponent } from 'src/lib/components/home/home.component';
import { AuthGuard } from 'src/lib/guards/auth.guard';
import { UserListComponent } from 'src/lib/components/user/user-list/user-list.component';
import { WelcomeComponent } from 'src/lib/components/welcome/welcome.component';
import { CityListComponent } from 'src/lib/components/city/city-list/city-list.component';


const routes: Routes = [
  {
    path: '', component: WelcomeComponent, pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user',
    children: [
      {
        path: 'registration', component: RegistrationComponent
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'list', component: UserListComponent, canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'city',
    children: [
      {
        path: 'list', component: CityListComponent, canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
