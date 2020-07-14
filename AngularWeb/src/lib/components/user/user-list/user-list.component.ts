import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/lib/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/lib/models/user.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogConfig } from '@angular/material';
import { Messages } from 'src/lib/utils/messages';
import { ToastrOptions, ActionType } from 'src/lib/utils/constants';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'fullname', 'username', 'email'];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  users: User[] = [];

  constructor(
    private userService: UserService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((result: User[]) => {
      this.users = result;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, () => {
      this.toastrService.error(Messages.ERROR_OCCURRED, Messages.ERROR, {
        timeOut: ToastrOptions.TimeOut
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(userEdited: User) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      mode: ActionType.Edit,
      userEdited
    };
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    // const dialogRef = this.dialog.open(CityAddComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe((city) => {
    //   if (city) {
    //     this.getAllCities();
    //   }
    // });
  }

}
