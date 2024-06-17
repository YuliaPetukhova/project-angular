// import {Injectable} from '@angular/core';
// import {Actions, createEffect, ofType} from '@ngrx/effects';
// import {login} from './login.actions';
// import {map, switchMap} from 'rxjs/operators';
// import {AccountService} from '../services/account.service';
// @Injectable()
// export class LoginEffects {
//
//   login$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(login),
//       switchMap(({user, id}) =>
//         this.authService.login(user, id).pipe(
//           map((user) => {
//             return login({user});
//           })
//         )
//       )
//     )
//   );
//
//   constructor(private actions$: Actions, private authService: AccountService) {
//   }
// }


import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, catchError, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {loginSuccess, loginFailure} from './login.actions';
import {AccountService} from '../../services/account.service';
import { IUser } from '../models/IUser';

@Injectable()
export class LoginEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Login] User Login'),
      switchMap(({user, password}) =>
        this.accountService.login(user, password).pipe(
          map((user: IUser) => {
            const token: string = user.token as string;
            return loginSuccess({token});
          }),
          catchError(error => of(loginFailure({error})))
        )
      )
    )
  );

  constructor(private actions$: Actions, private accountService: AccountService) {
  }
}
