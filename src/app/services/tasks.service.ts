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

  tasks: ITask[] = [];

  getAll(): Observable<ITask[]> {
    return this.http
      .get<ITask[]>(
        'https://gist.githubusercontent.com/YuliaPetukhova/21340a2637e4a4f0bc6c3fcc7f2c3b75/raw/1e82a818da34c8dcdc70f43d12aaf3dd1d627527/tasks.json',
        {
          params: new HttpParams().append('limit', 5),
        }
      )
      .pipe(
        delay(200),
        retry(2),
        tap((tasks) => (this.tasks = tasks))
      );
  }

  create(task: ITask): Observable<ITask> {
    return this.http
      .post<ITask>(
        'https://gist.githubusercontent.com/YuliaPetukhova/21340a2637e4a4f0bc6c3fcc7f2c3b75/raw/1e82a818da34c8dcdc70f43d12aaf3dd1d627527/tasks.json',
        task
      )
      .pipe(tap((tsk) => this.tasks.push(tsk)));
  }
}
