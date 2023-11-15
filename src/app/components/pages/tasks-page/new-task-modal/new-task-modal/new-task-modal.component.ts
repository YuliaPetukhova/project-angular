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

@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.sass'],
})
export class NewTaskModalComponent {
  public taskGroups: any;

  constructor(
    public dialogRef: MatDialogRef<NewTaskModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { groups: any }
  ) {
    this.taskGroups = window.structuredClone(data).groups;
  }

  doAction() {
    this.dialogRef.close({ data: this.taskGroups });
  }

  add(newValue: string): void {
    newValue = newValue.trim();

    if (!newValue) {
      return;
    }

    this.taskGroups.unshift({ value: '', viewValue: newValue });
  }
}
