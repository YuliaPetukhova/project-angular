import {Injectable} from '@angular/core';
import {ErrorInterceptor} from "./error.interceptor";

@Injectable({providedIn: 'root'})
export class AlertService {
  error(): void {
    alert('Произошла ошибка. Попробуйте зарегистрироваться.')
  }
}
