import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/lib/services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.css']
})
export class TopNavigationComponent implements OnInit, OnDestroy {

  public userLoggedIn: boolean;
  private subscription: Subscription;

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.subscription = this.loginService.getLoggedIn().subscribe(value => {
      this.userLoggedIn = value;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
