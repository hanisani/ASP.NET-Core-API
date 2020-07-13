import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/lib/services/user.service';
import { User } from 'src/lib/models/user.model';
import { Messages } from 'src/lib/utils/messages';
import { ToastrService } from 'ngx-toastr';
import { ToastrOptions } from 'src/lib/utils/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.userService.getUser().subscribe((result: any) => {
      if (result) {
        this.user = result;
      }
    }, () => {
      this.toastrService.error(Messages.USER_NOT_FOUND, Messages.ERROR, {
        timeOut: ToastrOptions.TimeOut
      });
    });
  }

}
