import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {IUser} from '../models/IUser';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private urlRegistration = 'http://localhost/api/v1/family-auth/registration';
  private urlLogin = 'http://localhost/api/v1/family-auth/login';
  private userSubject: BehaviorSubject<IUser | null>;
  public user: Observable<IUser | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<IUser>(this.urlLogin, {email, password})
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  register(user: IUser) {
    return this.http.post(this.urlRegistration, user);
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['']);
  }

}
