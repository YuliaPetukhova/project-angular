import { Component } from '@angular/core';


@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.sass']
})
export class NewTaskModalComponent {

    groups = [
        {value: 'group-0', viewValue: 'Домашние дела'},
        {value: 'group-1', viewValue: 'Странные дела'},
      ];
    
      add (newValue: string): void {
        newValue = newValue.trim();
        if(!newValue) {return;}
        this.groups.push({value: '','viewValue':newValue});
      }
}
