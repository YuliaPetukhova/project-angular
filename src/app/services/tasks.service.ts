import { Injectable } from '@angular/core';
import { ITask } from '../models/task';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private urlAllTasks =
    'https://gist.githubusercontent.com/YuliaPetukhova/21340a2637e4a4f0bc6c3fcc7f2c3b75/raw/2771c5bac5003c18ae3e1d7d202c0a669ca41b71/tasks.json';
  private urlNewTask =
    'https://gist.githubusercontent.com/YuliaPetukhova/f787a9fee9a088f4a52a6d52451a5d25/raw/42b4035b51de8b5a3bcec1d79458a2963a72a390/new.json';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<ITask[]>(this.urlAllTasks, {
      // params: new HttpParams().append('limit', 3),
    });
  }

  create(task: ITask): Observable<ITask> {
    return this.http.get<ITask>(this.urlNewTask);
  }

  updateTask(task: ITask): Observable<ITask> {
    // const urlParams = new HttpParams().set('id', id.toString());
    return this.http.get<ITask>(this.urlNewTask);
  }
  deleteTask(id: number) {
    return this.http.get<ITask>(this.urlNewTask);
  }
}

