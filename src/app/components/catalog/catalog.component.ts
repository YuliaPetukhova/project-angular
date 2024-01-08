import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { ITask } from 'src/app/models/ITask';
import { TasksService } from 'src/app/services/tasks.service';
import { TaskFormComponent } from './task-form/task-form.component';
import { IGroupTitle } from 'src/app/models/IGroupTitle';
import { BottomMenuComponent} from "./bottom-menu/bottom-menu.component";

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
    BottomMenuComponent
  ],
})
export class CatalogComponent {
  tasks: ITask[];
  groupTitles: IGroupTitle[];

  constructor(private matDialog: MatDialog, tasksService: TasksService) {
    tasksService.getAll().subscribe((result) => {
      this.tasks = result.groups;
      this.groupTitles = result.groupTitles;
    });
  }

  openDialog(): void {
    const dialog = this.matDialog.open(TaskFormComponent, {
      data: {
        groups: this.groupTitles,
        tasks: this.tasks,
      },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result && result.data && result.data.length > this.groupTitles.length) {
        this.groupTitles = result.data;
      }
    });
  }
}
