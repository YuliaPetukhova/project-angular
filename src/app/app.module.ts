import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CatalogComponent} from './components/catalog/catalog.component';
import {IndexComponent} from './components/main/index/index.component';
import {SharingService} from "./services/sharing/sharing.service";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ErrorInterceptor} from "./services/error.interceptor";
import {AlertComponent} from "./components/main/alert/alert.component";
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {loginReducer} from './store/login/login.reducer';
import {LoginEffects} from './store/login/login.effects';
import {reducers} from './store/login/login.init';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from './store/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
  ],
  imports: [
    CatalogComponent,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatSelectModule,
    MatMenuModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    AlertComponent,
    StoreModule.forRoot({login: loginReducer}),
    EffectsModule.forRoot([LoginEffects]),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
  ],
  providers: [
    {provide: SharingService},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
