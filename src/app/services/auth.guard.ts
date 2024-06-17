import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {AccountService} from './account.service';
import {IUser} from "../store/models/IUser";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private accountService: AccountService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user: IUser | null = this.accountService.userValue;
    if (user) {
      return true;
    }

    this.router.navigate([''], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
