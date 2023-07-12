import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapasIndexComponent } from './mapas/mapas-index/mapas-index.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
//page not found pending hacer ese import

const routes: Routes = [
  { path:'producto',component: MapasIndexComponent},
  { path:'', redirectTo:'/producto' ,pathMatch:'full'},
  { path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
