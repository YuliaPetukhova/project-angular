import { ModalComponent } from './components/modal/modal/modal.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/pages/main-page/main-page.component';
import { TaskPageComponent } from './components/pages/tasks-page/task-page.component';
import {MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
 
@NgModule({
  declarations: [
    MainPageComponent,
    TaskPageComponent,
    ModalComponent,
    
  ],
  imports: [
    AppComponent,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    BrowserModule,
    // RouterModule.forRoot([
    //   {path: 'modal', component: ModalComponent}
    //   ])
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
