import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import { NewTaskModalComponent } from './new-task-modal/new-task-modal/new-task-modal.component';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, MatDialogModule],
})
export class TaskPageComponent {
  
  constructor(private matDialog: MatDialog){}

  openDialog(): void{
    this.matDialog.open(NewTaskModalComponent,{
    })

  }
}