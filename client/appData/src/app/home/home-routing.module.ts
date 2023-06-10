import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { PageNotFoundComponent } from '../core/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path:'', redirectTo:'Inicio', pathMatch:'full'},
  {path:'**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }