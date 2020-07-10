import { Component, OnInit, ViewChild } from '@angular/core';
import { CityService } from 'src/lib/services/city.service';
import { Messages } from 'src/lib/utils/messages';
import { ToastrService } from 'ngx-toastr';
import { City } from 'src/lib/models/city.model';
import { MatDialogConfig, MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ActionType } from 'src/lib/utils/constants';
import { CityAddComponent } from '../city-add/city-add.component';

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
    }, (error) => {
      if (error.status === 404) { // statusText: "Not Found"
      this.toastrService.info(Messages.NO_RECORD, Messages.INFO, {
        timeOut: 3000
      });
      } else {
        this.toastrService.error(Messages.ERROR_OCCURRED, Messages.ERROR, {
          timeOut: 3000
        });
      }
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

  onEdit(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      mode: ActionType.Edit,
      id
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
    this.cityService.delete(id).subscribe((result: any) => {
      if (result) {
        this.getAllCities();
        this.toastrService.success(Messages.RECORD_DELETED, Messages.SUCCESS, {
          timeOut: 3000
        });
      }
    }, () => {
      this.toastrService.error(Messages.ERROR_OCCURRED, Messages.ERROR, {
        timeOut: 3000
      });
    });
  }

}
