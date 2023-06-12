import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './home/inicio/inicio.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { AcercaDeComponent } from './home/acerca-de/acerca-de.component';
//page not found pending hacer ese import

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path:'', component: AcercaDeComponent},
  {path:'', redirectTo:'Inicio', pathMatch:'full'},
  {path:'**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
