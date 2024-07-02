import {Injectable} from '@angular/core';
import {ITask} from '../store/models/ITask';
import {HttpClient} from '@angular/common/http';
import {Observable, delay} from 'rxjs';
import {ICatalog} from "../store/models/ICatalog";
import {AlertService} from "./alert.service";

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private urlAllTasks: string = 'http://localhost/api/v1/family-task/task-group/groups';
  private urlNewTask: string = 'http://localhost/api/v1/family-task/task/create';
  private urlUpdateTask: string = 'http://localhost/api/v1/family-task/task/update/';
  private urlDeleteTask: string = 'http://localhost/api/v1/family-task/task/delete/';
  private urlCreateTitleGroup: string = 'http://localhost/api/v1/family-task/task-group/create';

  constructor(private http: HttpClient, private alertService: AlertService) {
  }

  getAll(): Observable<ICatalog> {
    this.alertService.success('Задачи успешно загружены');
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
    this.alertService.success('Задача успешно удалена');

    return this.http.post<ITask>(this.urlDeleteTask + id, {});
  }
}
