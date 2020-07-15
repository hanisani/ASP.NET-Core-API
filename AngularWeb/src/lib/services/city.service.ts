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
    return this.httpClient.get(Helper.getBaseUrl() + 'api/city/one/?id=' + id, {
      headers: Helper.getHeaders()
    });
  }

  getAllCities(searchText: string = '', pageNumber: number = 1, recordsPerPage: number = 5): Observable<City[]> {
    let params = new HttpParams();

    params = params.append('searchText', searchText);
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('recordsPerPage', recordsPerPage.toString());

    return this.httpClient.get<City[]>(Helper.getBaseUrl() + 'api/city/all', {
      params,
      headers: Helper.getHeaders()
    });
  }

  add(city: City) {
    return this.httpClient.post(Helper.getBaseUrl() + 'api/city/add', city, {
      headers: Helper.getHeaders()
    });
  }

  update(city: City) {
    return this.httpClient.put(Helper.getBaseUrl() + 'api/city/update', city, {
      headers: Helper.getHeaders()
    });
  }

  delete(id: number) {
    return this.httpClient.delete(Helper.getBaseUrl() + 'api/city/delete/?id=' + id, {
      headers: Helper.getHeaders()
    });
  }

}
