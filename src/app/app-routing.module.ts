import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './components/main/index/index.component';
import {AuthGuard} from './services/auth.guard';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {
    path: 'catalog/:id',
    canActivate: [AuthGuard],
    loadComponent: () => import("./components/catalog/catalog.component").then(m => m.CatalogComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
