import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ITask } from 'src/app/models/task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
  standalone: true,
  imports: [MatCheckboxModule, CommonModule],
})
export class TaskItemComponent {
  @Input() task: ITask;

  // editedTask: Task;
	// statusMessage: string;
	// editTask(task: Task) {
    //     this.editedTask = new Task(
		//     task.id,
		//     task.createdAt,
		//     task.taskGroupId,
    //         task.text
    //     );
    // }

	// deleteTask(task: Task) {
    //     this.serv.deleteTask(task.id).subscribe((data) => {
    //         (this.statusMessage = 'Данные успешно удалены'),
    //             this.loadTask();
    //     });
    // }
}
