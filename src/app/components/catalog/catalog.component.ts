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
  URL = "/catalog/";
  DATA = 'currentGroup';

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

  changeCurrentGroup(groupTitle: IGroupTitle) {
    const url = this.URL + groupTitle.id;
    history.pushState(this.DATA, "", url);

    this.currentGroup = (this.groups.find((group => {
      return group.id == groupTitle.id;
    })) as IGroup);
  }

}
