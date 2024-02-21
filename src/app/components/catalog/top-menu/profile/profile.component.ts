import {Component} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule],
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css'],
})

export class ProfileComponent {
}
