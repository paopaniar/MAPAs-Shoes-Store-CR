import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapasIndexComponent } from './mapas-index/mapas-index.component';
import { MapasAllComponent } from './mapas-all/mapas-all.component';
import { MapasDetailComponent } from './mapas-detail/mapas-detail.component';
import { MapasDiagComponent } from './mapas-diag.component.css/mapas-diag.component';

const routes: Routes = [
  {path:'producto', component: MapasIndexComponent},

  {path:'producto/all', component: MapasAllComponent},

  {path:'producto/:id', component: MapasDetailComponent},

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapasRoutingModule { }
