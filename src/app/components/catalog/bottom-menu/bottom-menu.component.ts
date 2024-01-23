import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  Inject,
  Optional
} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {IGroupTitle} from "../../../models/IGroupTitle";
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ITask} from "../../../models/ITask";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  encapsulation: ViewEncapsulation.None
})

export class BottomMenuComponent {
  hideMenuBtn: boolean = false;
  placeholderAddTask: string = "";
  hideTaskBtns: boolean = true;
  hideDeleteBtn: boolean = true;
  ENTER_TEXT = "Введите текст";
  ADD_TASK = "Добавить задачу";
  myFormTask: FormGroup;
  task: ITask;


  @Input() groupTitles!: IGroupTitle[];
  @Output() menuClick = new EventEmitter<IGroupTitle>();
  @Output() createTask = new EventEmitter<FormGroup>();

  constructor(
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    private data: { groups: any; tasks: any; currentTask: ITask }) {
    this.placeholderAddTask = this.ADD_TASK;

    this.myFormTask = new FormGroup({
        taskGroup: new FormControl<number>(1),
        text: new FormControl<string>(''),
        price: new FormControl<number>(5)
      }
    );

  }

  onSubmit(task) {
    this.createTask.emit(this.myFormTask);
  }

  changeCurrentGroup(groupTitle: IGroupTitle) {
    this.menuClick.emit(groupTitle)
  }

  onFocus() {
    this.hideMenuBtn = true;
    this.placeholderAddTask = this.ENTER_TEXT;
  }

  onBlur() {
    if (this.hideTaskBtns) {
      this.hideMenuBtn = false;
      this.placeholderAddTask = this.ADD_TASK;
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
