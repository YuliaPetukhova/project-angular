import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CatalogComponent} from './components/catalog/catalog.component';
import {IndexComponent} from './components/main/index/index.component';

const routes: Routes = [
  {path: 'main', component: IndexComponent},
  {path: 'catalog/:id', component: CatalogComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
