import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CatalogComponent} from './components/catalog/catalog.component';
import {IndexComponent} from './components/main/index/index.component';

import { AuthGuard } from './services/auth.guard';



const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'catalog/:id', component: CatalogComponent, canActivate: [AuthGuard]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
