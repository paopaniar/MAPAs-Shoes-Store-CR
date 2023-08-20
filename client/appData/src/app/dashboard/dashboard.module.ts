import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card'; 
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardSalesComponent } from './dashboard-sales/dashboard-sales.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';


@NgModule({
  declarations: [
    DashboardSalesComponent,
    DashboardAdminComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule
  ],
  exports: [
    DashboardSalesComponent,
    DashboardAdminComponent
  ]
})
export class DashboardModule { }
