import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../models/city.model';
import { BaseURL } from '../utils/constants';
import { Helper } from '../utils/helper';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getCityById(id: number) {
    return this.httpClient.get(BaseURL.URL + 'api/city/one/?id=' + id, {
      headers: Helper.getHeaders()
    });
  }

  getAllCities() {
    return this.httpClient.get(BaseURL.URL + 'api/city/all', {
      headers: Helper.getHeaders()
    });
  }

  add(city: City) {
    return this.httpClient.post(BaseURL.URL + 'api/city/add', city, {
      headers: Helper.getHeaders()
    });
  }

  update(city: City) {
    return this.httpClient.put(BaseURL.URL + 'api/city/update', city, {
      headers: Helper.getHeaders()
    });
  }

  delete(id: number) {
    return this.httpClient.delete(BaseURL.URL + 'api/city/delete/?id=' + id, {
      headers: Helper.getHeaders()
    });
  }

}
