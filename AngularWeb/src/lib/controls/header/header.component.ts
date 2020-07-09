import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/lib/services/user.service';
import { LoginService } from 'src/lib/services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public userLoggedIn: boolean;
  private subscription: Subscription;

  constructor(
    private userService: UserService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.subscription = this.loginService.getLoggedIn().subscribe(value => {
      this.userLoggedIn = value;
    });
  }

  onLogout() {
    this.loginService.setLoggedIn(false);
    this.userService.logout();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
