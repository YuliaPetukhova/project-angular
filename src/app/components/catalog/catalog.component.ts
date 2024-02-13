import {Component, Inject, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
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
import {ITask} from "../../models/ITask";
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';


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
    TaskItemComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
})
export class CatalogComponent {

  groups: IGroup[];
  groupTitles: IGroupTitle[];
  currentGroup: IGroup;
  URL = "/catalog/";
  DATA = 'currentGroup';
  SETTINGS = 'Настройки';
  LOG_OUT = 'Выйти';


  constructor(
    private matDialog: MatDialog,
    private tasksService: TasksService,
    private route: ActivatedRoute,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    private data: { groups: any; tasks: any; currentTask: ITask }) {

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

  onCreate(myFormTask: FormGroup) {
    this.tasksService.create({
      text: myFormTask.value.text as string,
      taskGroupId: myFormTask.value.taskGroup ?? 1,
      createdAt: '',
      doneAt: '',
      deletedAt: '',
      price: myFormTask.value.price as number,
    }).subscribe((result) => {
      let newTaskGroupId = (this.groups.find((groupId => {
        return groupId.id == result.taskGroupId;

      })) as IGroup);

      newTaskGroupId.tasks.push(result);
    });
  }


  onUpdate(myFormTask: FormGroup) {
    const oldTaskGroupId = myFormTask.value.oldTaskGroupId;

    this.tasksService.updateTask({
      id: myFormTask.value.id as number,
      text: myFormTask.value.text as string,
      taskGroupId: myFormTask.value.taskGroup ?? 1,
      createdAt: '',
      doneAt: '',
      deletedAt: '',
      price: myFormTask.value.price as number,
    }).subscribe((savedTask) => {
      if (oldTaskGroupId !== savedTask.taskGroupId) {
        const newGroup = (this.groups.find((group => {
          return group.id == savedTask.taskGroupId;
        })) as IGroup);

        const oldGroup = (this.groups.find((group => {
          return group.id == oldTaskGroupId;
        })) as IGroup);

        newGroup.tasks.push(savedTask);
        oldGroup.tasks.splice(
          oldGroup.tasks.findIndex((filteredTask) => filteredTask.id == savedTask.id),
          1
        );

      } else {
        let updatedTaskGroup = (this.groups.find((groupId => {
          return groupId.id == savedTask.taskGroupId;
        })) as IGroup);

        const updatedTaskIndex
          = updatedTaskGroup.tasks.findIndex((filteredTask) => filteredTask.id == savedTask.id)
        updatedTaskGroup.tasks[updatedTaskIndex] = savedTask;

      }
    });
  }
}
