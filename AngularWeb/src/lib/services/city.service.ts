import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { City } from '../models/city.model';
import { Helper } from '../utils/helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getCityById(id: number) {
    let params = new HttpParams();
    params = params.append('id', id.toString());

    return this.httpClient.get(Helper.getBaseUrl() + 'api/city/one', {params});
  }

  getAllCities(searchText: string = '', pageNumber: number = 1, recordsPerPage: number = 5): Observable<City[]> {
    let params = new HttpParams();
    params = params.append('searchText', searchText);
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('recordsPerPage', recordsPerPage.toString());

    return this.httpClient.get<City[]>(Helper.getBaseUrl() + 'api/city/all', {params});
  }

  add(city: City) {
    return this.httpClient.post(Helper.getBaseUrl() + 'api/city/add', city);
  }

  update(city: City) {
    return this.httpClient.put(Helper.getBaseUrl() + 'api/city/update', city);
  }

  delete(id: number) {
    let params = new HttpParams();
    params = params.append('id', id.toString());

    return this.httpClient.delete(Helper.getBaseUrl() + 'api/city/delete', {params});
  }

}
