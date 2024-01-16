import {Component, Input, ViewEncapsulation, EventEmitter,Output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {IGroupTitle} from "../../../models/IGroupTitle";
import {CommonModule, Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {ITask} from "../../../models/ITask";
import {TasksService} from "../../../services/tasks.service";

@Component({
  selector: 'app-bottom-menu',
  // providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
    // Location,
    // LocationStrategy,
    // PathLocationStrategy
  ],
  encapsulation: ViewEncapsulation.None
})

export class BottomMenuComponent {
  hideMenuBtn: boolean = false;
  placeholderAddTask: string = "Добавить задачу";
  hideTaskBtns: boolean = true;
  hideDeleteBtn: boolean = true;

  @Input() groupTitles!: IGroupTitle[];

  @Output() menuClick = new EventEmitter<IGroupTitle>();
  changeCurrentGroup(groupTitle: IGroupTitle) {
    this.menuClick.emit(groupTitle)
  }

  onFocus() {
    this.hideMenuBtn = true;
    this.placeholderAddTask = "Введите текст";
  }

  onBlur() {
    if (this.hideTaskBtns) {
      this.hideMenuBtn = false;
      this.placeholderAddTask = "Добавить задачу";
    }
  }

  onChange(target: any){
    this.hideTaskBtns = this.hideDeleteBtn = (target as HTMLInputElement).value.length === 0;
  }

  clearInput(target: any) {
    const textInput = target.closest('div').getElementsByClassName('inputText')[0];
    (textInput as HTMLInputElement).value = '';

    this.hideTaskBtns = this.hideDeleteBtn = true;
    this.onBlur();
  }
}
