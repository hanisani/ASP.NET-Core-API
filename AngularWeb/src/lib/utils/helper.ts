import { HttpHeaders } from '@angular/common/http';
import { BaseURL } from './constants';

export class Helper {
  public static getHeaders() {
    const tokenHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    });
    return tokenHeader;
  }

  public static getBaseUrl() {
    const url = window.location.href;
    if (url.indexOf('localhost') > -1) {
      return BaseURL.LocalURL;
    } else {
      return BaseURL.WebURL;
    }
  }
}
