import {Injectable} from '@angular/core';
import {ITask} from '../models/ITask';
import {HttpClient} from '@angular/common/http';
import {Observable, delay} from 'rxjs';
import {ICatalog} from "../models/ICatalog";


@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private urlAllTasks = 'http://localhost/api/v1/family-task/task-group/groups';
  private urlNewTask = 'http://localhost/api/v1/family-task/task/create';
  private urlUpdateTask = 'http://localhost/api/v1/family-task/task/update/';
  private urlDeleteTask = 'http://localhost/api/v1/family-task/task/delete/';
  private urlCreateTitleGroup = 'http://localhost/api/v1/family-task/task-group/create';

  constructor(private http: HttpClient) {
  }


  getAll(): Observable<ICatalog> {
    return this.http.get<ICatalog>(this.urlAllTasks).pipe(
      delay(1000)
    );
  }

  create(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.urlNewTask, {
      taskGroupId: task.taskGroupId,
      text: task.text,
      price: task.price,
    });
  }

  createGroupTitle(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.urlCreateTitleGroup, task);
  }

  updateTask(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.urlUpdateTask + task.id, {
      text: task.text,
      taskGroupId: task.taskGroupId,
      price: task.price,
    });
  }

  deleteTask(id: number) {
    return this.http.post<ITask>(this.urlDeleteTask + id, {});
  }
}

