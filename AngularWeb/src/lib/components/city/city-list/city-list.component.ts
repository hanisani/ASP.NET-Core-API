import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { CityService } from 'src/lib/services/city.service';
import { Messages } from 'src/lib/utils/messages';
import { ToastrService } from 'ngx-toastr';
import { City } from 'src/lib/models/city.model';
import { MatDialogConfig, MatDialog, MatTableDataSource, MatPaginator, MatSort, PageEvent } from '@angular/material';
import { ActionType, ToastrOptions } from 'src/lib/utils/constants';
import { CityAddComponent } from '../city-add/city-add.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'code', 'actions'];
  dataSource: MatTableDataSource<City>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  cities: City[] = [];
  recordsPerPage = 5;
  pageNumber = 0;
  pageEvent: PageEvent;
  totalRecords = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  formSearch: FormGroup;

  constructor(
    private cityService: CityService,
    private toastrService: ToastrService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formSearch = this.fb.group({
      searchText: ['', [Validators.maxLength(10)]]
    });
  }

  ngAfterViewInit(): void {
    this.getAllCities();
  }

  getAllCities() {
    const searchText = String(this.formSearch.controls.searchText.value).trim().toLowerCase();
    this.cityService.getAllCities(searchText, this.pageNumber + 1, this.recordsPerPage).subscribe((result: City[]) => {
      this.cities = result;
      this.totalRecords = this.cities[0].total;
      this.dataSource = new MatTableDataSource(this.cities);
      this.paginator.length = this.totalRecords;
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

  applyFilter() {
    this.getAllCities();
    this.paginator.firstPage();
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

  handlePageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex;
    this.recordsPerPage = event.pageSize;
    this.getAllCities();
  }

}
