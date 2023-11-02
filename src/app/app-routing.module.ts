import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from './components/pages/main-page/main-page.component';
import { ModalComponent } from './components/modal/modal/modal.component';
import { TaskPageComponent } from './components/pages/tasks-page/task-page.component';


const routes: Routes = [
  { path: '', component: MainPageComponent},
  { path: 'modal', component: ModalComponent},
  { path: 'catalog', component: TaskPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



// import { ProductPageComponent } from './pages/product-page/product-page.component';

