import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NewTaskModalComponent } from './new-task-modal/new-task-modal/new-task-modal.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { ITask } from 'src/app/models/task';
import { tasks as data } from 'src/app/data/tasks';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    TasksListComponent,
  ],
})
export class TaskPageComponent {
  tasks: ITask[];

  public groups = [
    { value: 'group-0', viewValue: 'Домашние дела' },
    { value: 'group-1', viewValue: 'Странные дела' },
  ];

  constructor(
    private matDialog: MatDialog,
    private tasksService: TasksService
  ) {
    tasksService.getAll().subscribe((result) => {
      this.tasks = result.tasks;
    });
  }

  openDialog(): void {
    const dialog = this.matDialog.open(NewTaskModalComponent, {
      data: {
        groups: this.groups,
        tasks: this.tasks
      },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result && result.data && result.data.length > this.groups.length) {
        this.groups = result.data;
      }
    });
  }
}
