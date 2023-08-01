import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapasIndexComponent } from './mapas-index/mapas-index.component';
import { MapasAllComponent } from './mapas-all/mapas-all.component';
import { MapasDetailComponent } from './mapas-detail/mapas-detail.component';
import { MapasVendedorComponent } from './mapas-vendedor/mapas-vendedor.component';
import { MapasCreateComponent } from './mapas-create/mapas-create.component';


import { AuthGuard } from '../share/guards/auth.guard';

const routes: Routes = [
  {path:'producto', component: MapasIndexComponent},

  {path:'producto/crear', component: MapasCreateComponent,
  canActivate:[AuthGuard],
  data:{
    roles: ['ADMIN']
  }},

  {path:'producto/all', component: MapasAllComponent,
  canActivate:[AuthGuard],
    data:{
      roles: ['ADMIN']
    }
  },
  
  {path: 'producto/vendedor', component: MapasVendedorComponent,
  canActivate:[AuthGuard],
  data:{
    roles: ['SALES']
  }},

  {path:'producto/:id', component: MapasDetailComponent,
  canActivate:[AuthGuard],
  data:{
    roles: ['ADMIN']
  }},

  {path:'producto/update/:id', component: MapasCreateComponent,
  canActivate:[AuthGuard],
  data:{
    roles: ['ADMIN', 'SALES']
  }},

  {path:'producto/crearPregunta/:id', component: MapasDetailComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapasRoutingModule { }
