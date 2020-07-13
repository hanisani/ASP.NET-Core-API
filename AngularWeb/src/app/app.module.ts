import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from 'src/lib/components/user/registration/registration.component';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from 'src/lib/components/user/login/login.component';
import { HomeComponent } from 'src/lib/components/home/home.component';
import { DataTablesModule } from 'angular-datatables';
import { UserListComponent } from 'src/lib/components/user/user-list/user-list.component';
import { UserService } from 'src/lib/services/user.service';
import { HeaderComponent } from 'src/lib/controls/header/header.component';
import { TopNavigationComponent } from 'src/lib/controls/top-navigation/top-navigation.component';
import { WelcomeComponent } from '../lib/components/welcome/welcome.component';
import { BrownComponent } from '../lib/layouts/brown/brown.component';
import { LoginService } from 'src/lib/services/login.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CityListComponent } from 'src/lib/components/city/city-list/city-list.component';
import { CityAddComponent } from '../lib/components/city/city-add/city-add.component';
import { MatButtonModule } from '@angular/material/button';
import { TopNavigationBeforeLoginComponent } from '../lib/controls/top-navigation/top-navigation-before-login/top-navigation-before-login.component';
import { TopNavigationAfterLoginComponent } from '../lib/controls/top-navigation/top-navigation-after-login/top-navigation-after-login.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    UserListComponent,
    HeaderComponent,
    TopNavigationComponent,
    WelcomeComponent,
    BrownComponent,
    CityListComponent,
    CityAddComponent,
    TopNavigationBeforeLoginComponent,
    TopNavigationAfterLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    DataTablesModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule
  ],
  entryComponents: [
    CityAddComponent
  ],
  providers: [UserService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
