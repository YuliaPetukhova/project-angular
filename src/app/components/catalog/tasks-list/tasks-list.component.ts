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

  constructor(private serv: TasksService) {}

  onDelete(task: ITask) {
    this.serv.deleteTask(task.id as number).subscribe((data) => {
      this.tasks.splice(
        this.tasks.findIndex((filteredTask) => filteredTask.id === task.id),
        1
      );
    });
  }

  onEdit(task: ITask) {}
}
