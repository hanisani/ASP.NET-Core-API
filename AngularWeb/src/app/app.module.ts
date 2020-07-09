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
import { ListComponent } from 'src/lib/components/user/list/list.component';
import { UserService } from 'src/lib/services/user.service';
import { HeaderComponent } from 'src/lib/controls/header/header.component';
import { TopNavigationComponent } from 'src/lib/controls/top-navigation/top-navigation.component';
import { WelcomeComponent } from '../lib/components/welcome/welcome.component';
import { BrownComponent } from '../lib/layouts/brown/brown.component';
import { LoginService } from 'src/lib/services/login.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    ListComponent,
    HeaderComponent,
    TopNavigationComponent,
    WelcomeComponent,
    BrownComponent
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
    MatIconModule
  ],
  providers: [UserService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
