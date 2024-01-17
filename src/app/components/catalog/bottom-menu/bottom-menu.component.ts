import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {IGroupTitle} from "../../../models/IGroupTitle";
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    CommonModule
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

  onChange(target: any) {
    this.hideTaskBtns = this.hideDeleteBtn = (target as HTMLInputElement).value.length === 0;
  }

  clearInput(target: any) {
    const textInput = target.closest('div').getElementsByClassName('inputText')[0];
    (textInput as HTMLInputElement).value = '';

    this.hideTaskBtns = this.hideDeleteBtn = true;
    this.onBlur();
  }
}
