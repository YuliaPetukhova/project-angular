import {Component} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {AccountService} from 'src/app/services/account.service';
import {IUser} from 'src/app/models/IUser';


@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule],
  templateUrl: 'user-menu.component.html',
  styleUrls: ['user-menu.component.css'],
})

export class UserMenuComponent {
  user?: IUser | null;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  logout() {
    this.accountService.logout();
  }
}
