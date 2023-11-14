import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ITask } from 'src/app/models/task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.sass'],
  standalone: true,
  imports: [MatCheckboxModule, CommonModule],
})
export class TaskItemComponent {
  @Input() task: ITask;
}
