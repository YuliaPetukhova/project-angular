import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AccountService} from 'src/app/services/account.service';
import { delayRetryPipe } from './extensions';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // jwt токен авторизации
    const token: string = this.accountService.accessToken;
    if (!!token)
      request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })

    return next.handle(request).pipe(delayRetryPipe());

    // return next.handle(request).pipe(catchError(err => {
    //   if ([401, 403, 500-599].includes(err.status) && this.accountService.userValue) {
    //     this.accountService.logout();
    //   }
    //   const error = err.error?.message || err.statusText;
    //   console.error(err);
    //   return throwError(() => error);
    // }))
  }
}
