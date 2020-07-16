import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalesInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(
      req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `This is client side error. Error: ${error.error.message}`;
        } else {
          errorMsg = `This is server side error. Error Code: ${error.status},  Message: ${error.message}`;
        }
        console.log(errorMsg);
        // Above console log will return like below line
        // This is server side error. Error Code: 404,  Message: Http failure response for http://localhost:54060/api/city/all1?searchText=&pageNumber=1&recordsPerPage=5: 404 Not Found
        return throwError(errorMsg);
      }), finalize(() => {
        console.log(req.method + ' :: ' + req.urlWithParams);
        // Above console log will return like below line
        // GET :: http://localhost:54060/api/city/all1?searchText=&pageNumber=1&recordsPerPage=5
      })
    );
  }
}
