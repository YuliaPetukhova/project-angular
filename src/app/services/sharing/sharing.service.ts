import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class SharingService {
  private dataTask = new BehaviorSubject("")
  currentDataTask = this.dataTask.asObservable();
  setDataTask(data){
    this.dataTask.next(data)
  }
}

