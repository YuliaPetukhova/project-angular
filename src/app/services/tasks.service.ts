import { Injectable } from '@angular/core';
import { ITask } from '../models/task';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private http: HttpClient;
  tasks: any;

  constructor() { }

  create(task:ITask): Observable<ITask>{
    return this.http.post<ITask>('https://fakestoreapi.com/products', task)
    .pipe(
        tap(tsk=> this.tasks.push(tsk))
    )
}
}
