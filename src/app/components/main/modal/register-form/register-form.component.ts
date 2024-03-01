import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from 'src/app/services/account.service';
import {first} from 'rxjs/operators';
import {BaseAuthFormComponent} from "../base-auth-form/base-auth-form.component";

@Component({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  selector: 'app-register-form',
  standalone: true,
  styleUrls: ['../modal.component.css'],
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent extends BaseAuthFormComponent {

  constructor(
    formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
  ) {
    super(formBuilder);
  }


  override sendRequest() {
    this.accountService.register(this.authForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate([''], {relativeTo: this.route});
        }
      });
  }



}
