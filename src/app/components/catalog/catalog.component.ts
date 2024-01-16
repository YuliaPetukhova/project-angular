import {Component, Output, EventEmitter, Input} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TasksListComponent} from './tasks-list/tasks-list.component';
import {TasksService} from 'src/app/services/tasks.service';
import {IGroupTitle} from 'src/app/models/IGroupTitle';
import {BottomMenuComponent} from "./bottom-menu/bottom-menu.component";
import {IGroup} from "../../models/IGroup";
import {ActivatedRoute} from '@angular/router';
import {TaskItemComponent} from "./tasks-list/task-item/task-item/task-item.component";

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
    BottomMenuComponent,
    TaskItemComponent
  ],
})
export class CatalogComponent {
  groups: IGroup[];
  groupTitles: IGroupTitle[];
  currentGroup: IGroup;

  constructor(private matDialog: MatDialog, tasksService: TasksService, private route: ActivatedRoute) {
    tasksService.getAll().subscribe((result) => {
        this.groups = result.groups;
        this.groupTitles = result.groupTitles;

        this.route.params.subscribe(params => {
          this.currentGroup = (this.groups.find((group => {
            return group.id == params['id'];
          })) as IGroup);
        })

      }
    );
  }
  //
  // changeCurrentGroup() {
  //   console.log(id);
  // }
  changeCurrentGroup(groupTitle: IGroupTitle) {
    console.log(groupTitle.id);
    const urlTitle = "/catalog/" + groupTitle.id;
    history.pushState(this.currentGroup.id, "", urlTitle);

    this.route.params.subscribe(params => {
      this.currentGroup = (this.groups.find((group => {
        return group.id == params['id'];
      })) as IGroup);
    })
    //   1
    // push state используя полученный айди
    // 2
    // переиспользовать без дублтирования кода фильтр из конструктора
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
