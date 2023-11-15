import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';

import { TaskPageComponent } from '../../task-page.component';
import { Dialog } from '@angular/cdk/dialog';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.sass'],
})
export class NewTaskModalComponent {
  public taskGroups: any;

  constructor(
    private tasksService: TasksService,
    public dialogRef: MatDialogRef<NewTaskModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { groups: any }
  ) {
    this.taskGroups = window.structuredClone(data).groups;
  }

  doAction() {
	this.tasksService.getAll().subscribe((result) => {
		console.log(result)
	  })
	// let re = this.tasksService.getAll();
	// console.log(re)
    // this.tasksService.create({
    //   id: 3,
    //   text: 'Your perfect pack for everyday',
    //   taskGroupId: 1,
    //   createdAt: '02/11/23',
    //   doneAt: '05/11/23',
    //   deletedAt: '06/11/23',
    //   price: 300,
    // }).subscribe(()=>{
	// 	this.dialogRef.close();
	// });

    // this.dialogRef.close({ data: this.taskGroups });
  }

  add(newValue: string): void {
    newValue = newValue.trim();

    if (!newValue) {
      return;
    }

    this.taskGroups.unshift({ value: '', viewValue: newValue });
  }
}
