import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ITask } from 'src/app/models/task';
import { TaskItemComponent } from './task-item/task-item/task-item.component';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
  standalone: true,
  imports: [MatCheckboxModule, CommonModule, TaskItemComponent],
})
export class TasksListComponent {
  editedTask: ITask;
  @Input() tasks: ITask[];
  @Input() task: ITask;

  constructor(private serv: TasksService) {
    // this.tasks = [];
  }

  onDelete(task: ITask) {
    console.log(this.task);
    this.serv.deleteTask(this.task.id as number).subscribe((data) => {
      console.log(this.task);
      const key = this.tasks.filter((task) => {
        return task.id === this.task.id;
      });
      console.log(key);
    //   this.tasks.splice(key);
    //   (this.statusMessage = 'Данные успешно удалены'), this.loadTasks();
    });
  }

  onEdit(task: ITask) {
    // this.editedTask = {
    //   id: 0,
    //   text: 'this.myFormTask.value.text as string',
    //   taskGroupId: 1,
    //   createdAt: '',
    //   doneAt: '',
    //   deletedAt: '',
    // };
  }
}
