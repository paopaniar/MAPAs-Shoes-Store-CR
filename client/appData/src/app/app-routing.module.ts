import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapasIndexComponent } from './mapas/mapas-index/mapas-index.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { InicioComponent } from './home/inicio/inicio.component';
//page not found pending hacer ese import

const routes: Routes = [
  { path:'inicio',component: InicioComponent},
  { path:'', redirectTo:'/inicio' ,pathMatch:'full'},
  { path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
