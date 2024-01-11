import {Component} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TasksListComponent} from './tasks-list/tasks-list.component';
import {TasksService} from 'src/app/services/tasks.service';
import {IGroupTitle} from 'src/app/models/IGroupTitle';
import {BottomMenuComponent} from "./bottom-menu/bottom-menu.component";
import {IGroup} from "../../models/IGroup";

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
  groups: IGroup[];
  groupTitles: IGroupTitle[];

  constructor(private matDialog: MatDialog, tasksService: TasksService) {
    tasksService.getAll().subscribe((result) => {
        this.groups = result.groups;
        this.groupTitles = result.groupTitles;
      }
    );
  }


  // openDialog(): void {
  //   const dialog = this.matDialog.open(TaskFormComponent, {
  //     data: {
  //       groups: this.groupTitles,
  //       tasks: this.tasks,
  //     },
  //   });

  // dialog.afterClosed().subscribe((result) => {
  //   if (result && result.data && result.data.length > this.groupTitles.length) {
  //     this.groupTitles = result.data;
  //   }
  // });
  // }
}
