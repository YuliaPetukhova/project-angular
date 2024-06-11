import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class SharingService {
  private dataTask = new BehaviorSubject("")
  currentDataTask = this.dataTask.asObservable();

  setDataTask(data): void {
    this.dataTask.next(data)
  }
}

