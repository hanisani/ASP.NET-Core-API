import { HttpHeaders } from '@angular/common/http';

export class Helper {
  public static getHeaders() {
    const tokenHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    });
    return tokenHeader;
  }
}
