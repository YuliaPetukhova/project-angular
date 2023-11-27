import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ModalComponent } from './components/modal/modal/modal.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/pages/main-page/main-page.component';
import { TaskPageComponent } from './components/pages/tasks-page/task-page.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { TasksService } from './services/tasks.service';
import { HttpClientModule } from '@angular/common/http';
import { TaskFormComponent } from './components/pages/tasks-page/task-form/task-form/task-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ModalComponent,

    TaskFormComponent,
  ],
  imports: [
    TaskPageComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
