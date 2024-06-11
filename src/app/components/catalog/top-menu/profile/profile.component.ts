import {Component, OnInit} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {NgOptimizedImage} from "@angular/common";
import {AccountService} from 'src/app/services/account.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, NgOptimizedImage],
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css'],
})

export class ProfileComponent implements OnInit {
  userEmail: string | undefined;

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.userEmail = this.accountService.userValue?.user;
  }
}
