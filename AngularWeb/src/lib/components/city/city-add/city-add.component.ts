import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { City } from 'src/lib/models/city.model';
import { CityService } from 'src/lib/services/city.service';
import { Messages } from 'src/lib/utils/messages';
import { ToastrService } from 'ngx-toastr';
import { ActionType } from 'src/lib/utils/constants';

@Component({
  selector: 'app-city-add',
  templateUrl: './city-add.component.html',
  styleUrls: ['./city-add.component.css']
})
export class CityAddComponent implements OnInit {

  city: City;
  mode: string;
  formCity: FormGroup;
  cityEdited: City;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CityAddComponent>,
    private fb: FormBuilder,
    private cityService: CityService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    if (this.data) {
      this.mode = this.data.mode;
      this.cityEdited = this.data.cityEdited;
    }
    if (this.cityEdited) {
      this.city = this.cityEdited;
    } else {
      this.city = new City();
    }
    this.createForm();
  }

  createForm() {
    this.formCity = this.fb.group({
      name: [this.city.name, [Validators.required, Validators.maxLength(30)]],
      code: [this.city.code, [Validators.required, Validators.maxLength(30)]]
    });
  }

  onSubmit() {
    if (this.mode === ActionType.Add) { // add
      this.city = this.formCity.value as City;
      this.cityService.add(this.city).subscribe((result: any) => {
        if (result) {
          this.city.id = result;
          this.dialogRef.close(this.city);
          this.toastrService.success(Messages.RECORD_CREATED, Messages.SUCCESS, {
            timeOut: 3000
          });
        }
      }, () => {
        this.toastrService.error(Messages.RECORD_ALREADY_EXISTS, Messages.ERROR, {
          timeOut: 3000
        });
      });
    } else { // update
      this.city = this.formCity.value as City;
      this.city.id = this.cityEdited.id;
      this.cityService.update(this.city).subscribe((result: any) => {
        if (result) {
          this.city.id = result;
          this.dialogRef.close(this.city);
          this.toastrService.success(Messages.RECORD_CREATED, Messages.SUCCESS, {
            timeOut: 3000
          });
        }
      }, () => {
        this.toastrService.error(Messages.RECORD_ALREADY_EXISTS, Messages.ERROR, {
          timeOut: 3000
        });
      });
    }
  }

}
