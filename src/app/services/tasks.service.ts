import { Injectable } from '@angular/core';
import { ITask } from '../models/task';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { delay, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<ITask[]>(
      'https://gist.githubusercontent.com/YuliaPetukhova/21340a2637e4a4f0bc6c3fcc7f2c3b75/raw/1e82a818da34c8dcdc70f43d12aaf3dd1d627527/tasks.json',
      {
        params: new HttpParams().append('limit', 5),
      }
    );
  }
  static use(arg0: any) {
    throw new Error('Method not implemented.');
  }

  create(task: ITask): Observable<ITask> {
    return this.http.get<ITask>(
      'https://gist.githubusercontent.com/YuliaPetukhova/f787a9fee9a088f4a52a6d52451a5d25/raw/42b4035b51de8b5a3bcec1d79458a2963a72a390/new.json'
    );
  }
}
