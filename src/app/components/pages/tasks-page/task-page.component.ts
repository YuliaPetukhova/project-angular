import { Component, Inject, Optional } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NewTaskModalComponent } from './new-task-modal/new-task-modal/new-task-modal.component';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, MatDialogModule],
})
export class TaskPageComponent {
  private groups = [
    { value: 'group-0', viewValue: 'Домашние дела' },
    { value: 'group-1', viewValue: 'Странные дела' },
  ];

  constructor(private matDialog: MatDialog) {}

  openDialog(): void {
    const dialog = this.matDialog.open(NewTaskModalComponent, {
      data: {
        groups: this.groups,
      },
    });

    dialog.afterClosed().subscribe((result) => {
      this.groups = result.data;
    });
  }
}
