import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IGroupTitle} from "../../../store/models/IGroupTitle";

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
  standalone: true,
  imports: [
    CommonModule,
  ]
})

export class LeftMenuComponent {
  @Output() menuClick: EventEmitter<IGroupTitle> = new EventEmitter<IGroupTitle>();
  @Input() groupTitles!: IGroupTitle[] | undefined;

  changeCurrentGroup(groupTitle: IGroupTitle): void {
    this.menuClick.emit(groupTitle)
  }

  shouldHideElement: boolean = false;

  toggleElementVisibility(): void {
    this.shouldHideElement = !this.shouldHideElement;
    document.getElementsByClassName('task-list')[0].classList.toggle('expanded-menu');
  }
}
