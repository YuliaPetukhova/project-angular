import {Component, EventEmitter, Inject, Input, OnInit, Optional, Output, ViewEncapsulation} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {IGroupTitle} from "../../../models/IGroupTitle";
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ITask} from "../../../models/ITask";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SharingService} from "../../../services/sharing/sharing.service";


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

export class BottomMenuComponent implements OnInit {
  placeholderAddTask: string = "";
  ENTER_TEXT = "Введите текст";
  ADD_TASK = "Добавить задачу";
  myFormTask: FormGroup;
  task: ITask;
  editingTask: ITask;

  defaultState: boolean = true;
  focusState: boolean = false;
  workingState: boolean = false;

  toDefaultState() {
    this.defaultState = true;
    this.focusState = this.workingState = false;

    this.placeholderAddTask = this.ADD_TASK;
  }

  toFocusState() {
    this.focusState = true;
    this.defaultState = this.workingState = false;

    this.placeholderAddTask = this.ENTER_TEXT;

  }

  toWorkingState() {
    this.workingState = true;
    this.focusState = this.defaultState = false;
  }


  @Input() groupTitles!: IGroupTitle[];
  @Output() menuClick = new EventEmitter<IGroupTitle>();
  @Output() createTask = new EventEmitter<FormGroup>();
  @Output() updateTask = new EventEmitter<FormGroup>();

  constructor(
    private sharingService: SharingService,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    private data: { groups: any; tasks: any; currentTask: ITask }) {
    this.placeholderAddTask = this.ADD_TASK;

  }

  ngOnInit() {
    this.sharingService.currentDataTask.subscribe(data => {
      if (typeof data === 'object') {
        this.editingTask = data;

        this.toWorkingState();
      }

      this.myFormTask = new FormGroup({
          taskGroup: new FormControl<number>(this.editingTask?.taskGroupId),
          text: new FormControl<string>(this.editingTask?.text),
          price: new FormControl<number>(this.editingTask?.price),
          id: new FormControl<any>(this.editingTask?.id),
          oldTaskGroupId: new FormControl<number>(this.editingTask?.taskGroupId)
        }
      );
    });
  }

  onSubmit(task: ITask) {
    if (this.editingTask) {
      this.updateTask.emit(this.myFormTask);
      this.toDefaultState();
      this.clearForm();
    } else {
      this.createTask.emit(this.myFormTask);
      this.toDefaultState();
      this.clearForm();
    }
  }

  changeCurrentGroup(groupTitle: IGroupTitle) {
    this.menuClick.emit(groupTitle)
  }

  onFocus() {
    if (this.defaultState) {
      this.toFocusState();
    }
  }

  onBlur() {
    if (this.focusState) {
      this.toDefaultState();
    }
  }

  onChange(target: any) {
    if ((target as HTMLInputElement).value.length === 0) {
      this.toFocusState();
    } else {
      this.toWorkingState();
    }
  }


  clearForm() {
    this.myFormTask.reset();
    this.toDefaultState();
  }

}
