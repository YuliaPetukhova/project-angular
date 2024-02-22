import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IGroupTitle} from "../../../models/IGroupTitle";


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

  @Output() menuClick = new EventEmitter<IGroupTitle>();

  @Input() groupTitles!: IGroupTitle[] | undefined;


  changeCurrentGroup(groupTitle: IGroupTitle) {
    this.menuClick.emit(groupTitle)
  }

  shouldHideElement = false;

  toggleElementVisibility() {
    this.shouldHideElement = !this.shouldHideElement;
    document.getElementsByClassName('task-list')[0].classList.toggle('expanded-menu');
  }
}
