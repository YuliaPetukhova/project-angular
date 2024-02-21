import {Component} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule],
  templateUrl: 'user-menu.component.html',
  styleUrls: ['user-menu.component.css'],
})

export class UserMenuComponent {
}
