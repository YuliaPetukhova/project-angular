import {Component, EventEmitter, Inject, Input, OnInit, Optional, Output, ViewEncapsulation} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {IGroupTitle} from "../../../models/IGroupTitle";
import {CommonModule, AsyncPipe} from '@angular/common';
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
    ReactiveFormsModule,
    AsyncPipe
  ],
  encapsulation: ViewEncapsulation.None
})

export class BottomMenuComponent implements OnInit {
  placeholderAddTask: string = "";
  ENTER_TEXT: string = "Введите текст";
  ADD_TASK: string = "Создать задачу/группу";
  myFormTask: FormGroup;
  task: ITask;
  editingTask: ITask;
  defaultState: boolean = true;
  focusState: boolean = false;
  workingState: boolean = false;

  toDefaultState(): void {
    this.defaultState = true;
    this.focusState = this.workingState = false;

    this.placeholderAddTask = this.ADD_TASK;
  }

  toFocusState(): void {
    this.focusState = true;
    this.defaultState = this.workingState = false;

    this.placeholderAddTask = this.ENTER_TEXT;
  }

  toWorkingState(): void {
    this.workingState = true;
    this.focusState = this.defaultState = false;
  }

  @Input() groupTitles!: IGroupTitle[] | undefined;
  @Output() menuClick: EventEmitter<IGroupTitle> = new EventEmitter<IGroupTitle>();
  @Output() createTask: EventEmitter<FormGroup<any>> = new EventEmitter<FormGroup>();
  @Output() updateTask: EventEmitter<FormGroup<any>> = new EventEmitter<FormGroup>();

  constructor(
    private sharingService: SharingService,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    private data: { groups: any; tasks: any; currentTask: ITask }) {
    this.placeholderAddTask = this.ADD_TASK;
  }

  ngOnInit(): void {
    this.sharingService.currentDataTask.subscribe(data => {
      if (typeof data === 'object') {
        this.editingTask = data;

        this.toWorkingState();
      }

      this.myFormTask = new FormGroup({
          id: new FormControl<any>(this.editingTask?.id),
          oldTaskGroupId: new FormControl<number>(this.editingTask?.taskGroupId),
          price: new FormControl<number>(this.editingTask?.price),
          taskGroup: new FormControl<number>(this.editingTask?.taskGroupId),
          text: new FormControl<string>(this.editingTask?.text)
        }
      );
    });
  }

  onSubmit(task: ITask): void {
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

  changeCurrentGroup(groupTitle: IGroupTitle): void {
    this.menuClick.emit(groupTitle)
  }

  onFocus(): void {
    if (this.defaultState) {
      this.toFocusState();
    }
  }

  onBlur(): void {
    if (this.focusState) {
      this.toDefaultState();
    }
  }

  onChange(target: any): void {
    if ((target as HTMLInputElement).value.length === 0) {
      this.toFocusState();
    } else {
      this.toWorkingState();
    }
  }

  clearForm(): void {
    this.myFormTask.reset();
    this.toDefaultState();
  }
}
