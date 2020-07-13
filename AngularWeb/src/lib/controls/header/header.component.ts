import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/lib/services/user.service';
import { LoginService } from 'src/lib/services/login.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ConfirmDialogComponent } from 'src/lib/components/shared/confirm-dialog/confirm-dialog.component';

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
    private loginService: LoginService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.subscription = this.loginService.getLoggedIn().subscribe(value => {
      this.userLoggedIn = value;
    });
  }

  onLogout() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
    };
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.loginService.setLoggedIn(false);
        this.userService.logout();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
