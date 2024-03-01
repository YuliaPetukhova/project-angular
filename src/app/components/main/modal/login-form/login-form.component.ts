import {LeftMenuComponent} from "../../../catalog/left-menu/left-menu.component";
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from 'src/app/services/account.service';
import {first} from 'rxjs/operators';
import {BaseAuthFormComponent} from "../base-auth-form/base-auth-form.component";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../modal.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    LeftMenuComponent
  ],
})
export class LoginFormComponent extends BaseAuthFormComponent {

  constructor(
    formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private dialogRef: MatDialogRef<LoginFormComponent>,
  ) {
    super(formBuilder);
  }


  get f() {
    return this.authForm.controls;
  }

  override sendRequest() {
    this.accountService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.dialogRef.close();
          this.router.navigate(['/catalog/1']);
        }
      });
  }
}
