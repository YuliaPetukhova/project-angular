import {createReducer, on} from '@ngrx/store';
import {login, loginSuccess, loginFailure} from './login.actions';

export interface LoginState {
  user: string | null;
  token: string | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: LoginState = {
  user: null,
  token: null,
  error: null,
  isLoading: false
};

export const loginReducer = createReducer(initialState,
  on(login, (state, {user}) => ({...state, user, isLoading: true})),
  on(loginSuccess, (state, {token}) => ({...state, token, isLoading: false})),
  on(loginFailure, (state, {error}) => ({...state, error, isLoading: false}))
);
