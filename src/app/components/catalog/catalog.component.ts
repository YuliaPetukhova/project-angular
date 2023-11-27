import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { ITask } from 'src/app/models/task';
import { TasksService } from 'src/app/services/tasks.service';
import { TaskFormComponent } from './task-form/task-form.component';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    TasksListComponent,
  ],
})
export class CatalogComponent {
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
    const dialog = this.matDialog.open(TaskFormComponent, {
      data: {
        groups: this.groups,
        tasks: this.tasks,
      },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result && result.data && result.data.length > this.groups.length) {
        this.groups = result.data;
      }
    });
  }
}
