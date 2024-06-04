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

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401, 403, 500-599].includes(err.status) && this.accountService.userValue) {
        this.accountService.logout();
      }
debugger;
      const error = err.error?.message || err.statusText;
      console.error(err);
      return throwError(() => error);
    }))
  }
}
