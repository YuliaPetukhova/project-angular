import { Injectable } from '@angular/core';
import { ITask } from '../models/task';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private urlAllTasks = 'http://localhost/api/v1/family-task/task-group/groups';
  private urlNewTask = 'http://localhost/api/v1/family-task/task/create';
  private urlUpdateTask = 'http://localhost/api/v1/family-task/task/update/text/id';
  private urlDeleteTask = 'http://localhost/api/v1/family-task/task/delete/id';
  private urlCreateTitleGroup = 'http://localhost/api/v1/family-task/task-group/create';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<ITask[]>(this.urlAllTasks, {
    });
  }

  create(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.urlNewTask, task);
  }

  createGroupTitle(task: ITask): Observable<ITask>{
    return this.http.post<ITask>(this.urlCreateTitleGroup, task);
  }

  updateTask(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.urlUpdateTask, task);
  }
  deleteTask(id: number) {
    return this.http.delete<ITask>(this.urlDeleteTask);
  }
}

