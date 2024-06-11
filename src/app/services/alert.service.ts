import {Injectable} from '@angular/core';
import {ErrorInterceptor} from "./error.interceptor";
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {IUser} from "../models/IUser";
import getDocumentElement from "@popperjs/core/lib/dom-utils/getDocumentElement";

@Injectable({providedIn: 'root'})
export class AlertService {
  private _success: BehaviorSubject<string | null>;
  public success$: Observable<string | null>;

  private _error: BehaviorSubject<string | null>;
  public error$: Observable<string | null>;

  constructor() {
    this._success = new BehaviorSubject<string | null>(null);
    this.success$ = this._success.asObservable();

    this._error = new BehaviorSubject<string | null>(null);
    this.error$ = this._error.asObservable();
  }

  success(message: string): void {
    this._success.next(message);

    setTimeout((): void => {
      this._success.next(null);
    }, 3000);
  }

  error(message: string): void {
    this._error.next(message);

    setTimeout((): void => {
      this._error.next(null);
    }, 3000);
  }

  public get getSuccessAlert() {
    return this._success.value;
  }

  public get getErrorAlert() {
    return this._error.value;
  }
}
