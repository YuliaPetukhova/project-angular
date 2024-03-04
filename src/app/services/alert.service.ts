import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AlertService {
  error() {
    alert('Произошла ошибка')
  }
}
