import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { ITask } from 'src/app/models/task';
import { tasks as data } from 'src/app/data/tasks';
import { TaskItemComponent } from './task-item/task-item/task-item.component';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.sass'],
  standalone: true,
  imports: [MatCheckboxModule, CommonModule, TaskItemComponent],
})
export class TasksListComponent {
  @Input() tasks: ITask[];
  // tasks: ITask[] = data
}
