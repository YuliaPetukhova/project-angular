import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { NewTaskModalComponent } from './new-task-modal/new-task-modal/new-task-modal.component';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent {
  
  constructor(private matDialog: MatDialog){}

  openDialog(): void{
    this.matDialog.open(NewTaskModalComponent,{
    })

  }
}