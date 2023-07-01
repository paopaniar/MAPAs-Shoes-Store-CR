import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapasIndexComponent } from './mapas-index/mapas-index.component';

const routes: Routes = [
  {path:'mapas',component:MapasIndexComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapasRoutingModule { }
