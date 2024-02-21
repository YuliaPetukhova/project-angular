import {Component} from '@angular/core';
import {IUser} from 'src/app/models/IUser';
import {AccountService} from 'src/app/services/account.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {ProfileComponent} from "./profile/profile.component";
import {UserMenuComponent} from "./profile/user-menu/user-menu.component";

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, ProfileComponent, UserMenuComponent],
  templateUrl: 'top-menu.component.html',
  styleUrls: ['top-menu.component.css'],
})

export class TopMenuComponent {
  user: IUser | null;
  email: string;

  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
  }

}
