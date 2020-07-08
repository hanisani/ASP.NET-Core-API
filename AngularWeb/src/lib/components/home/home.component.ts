import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/lib/services/user.service';
import { User } from 'src/lib/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUserProfile();
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  getUserProfile() {
    this.userService.getUser().subscribe((result: any) => {
      if (result) {
        this.user = result;
        // localStorage.setItem('token', result.token);
        // this.router.navigateByUrl('/home');
      }
    }, (error) => {
      console.log(error);
      // this.toastrService.error(Messages.USER_NOT_FOUND, Messages.ERROR, {
      //   timeOut: 3000
      // });
    });
  }

}
