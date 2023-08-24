import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardSalesComponent } from './dashboard-sales/dashboard-sales.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { AuthGuard } from '../share/guards/auth.guard';

const routes: Routes = [
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
export class DashboardRoutingModule { }
