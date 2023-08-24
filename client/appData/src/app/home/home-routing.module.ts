import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';
import { DashboardSalesComponent } from '../dashboard/dashboard-sales/dashboard-sales.component';
import { DashboardAdminComponent }  from '../dashboard/dashboard-admin/dashboard-admin.component';
import { AuthGuard } from '../share/guards/auth.guard';
const routes: Routes = [
  { path:'acerca-de', component:AcercaDeComponent},
  
  {path: 'admin/grafico', component: DashboardAdminComponent,
  canActivate:[AuthGuard],
  data:{
    roles: ['Administrador']
  }},

  {path:'vendedor/grafico', component: DashboardSalesComponent,
  canActivate:[AuthGuard],
  data:{
    roles: ['Vendedor']
  }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
