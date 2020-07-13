import { Component, OnInit, ViewChild } from '@angular/core';
import { CityService } from 'src/lib/services/city.service';
import { Messages } from 'src/lib/utils/messages';
import { ToastrService } from 'ngx-toastr';
import { City } from 'src/lib/models/city.model';
import { MatDialogConfig, MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ActionType, ToastrOptions } from 'src/lib/utils/constants';
import { CityAddComponent } from '../city-add/city-add.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'code', 'actions'];
  dataSource: MatTableDataSource<City>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  cities: City[] = [];

  constructor(
    private cityService: CityService,
    private toastrService: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllCities();
  }


  getAllCities() {
    this.cityService.getAllCities().subscribe((result: City[]) => {
      this.cities = result;
      this.dataSource = new MatTableDataSource(this.cities);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, () => {
      this.toastrService.error(Messages.ERROR_OCCURRED, Messages.ERROR, {
        timeOut: ToastrOptions.TimeOut
      });
    });
  }

  onAddCity() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      mode: ActionType.Add
    };
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(CityAddComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((city) => {
      if (city) {
        this.getAllCities();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(cityEdited: City) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      mode: ActionType.Edit,
      cityEdited
    };
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(CityAddComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((city) => {
      if (city) {
        this.getAllCities();
      }
    });
  }

  onDelete(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
    };
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.cityService.delete(id).subscribe((result: any) => {
          if (result) {
            this.getAllCities();
            this.toastrService.success(Messages.RECORD_DELETED, Messages.SUCCESS, {
              timeOut: ToastrOptions.TimeOut
            });
          }
        }, () => {
          this.toastrService.error(Messages.ERROR_OCCURRED, Messages.ERROR, {
            timeOut: ToastrOptions.TimeOut
          });
        });
      }
    });
  }

}
