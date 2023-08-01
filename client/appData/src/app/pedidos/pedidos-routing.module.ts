import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosAllComponent } from './pedidos-all/pedidos-all.component';
import { PedidosIndexComponent } from './pedidos-index/pedidos-index.component';
import { PedidosClienteComponent } from './pedidos-cliente/pedidos-cliente.component';
import { PedidosDiagComponent } from './pedidos-diag/pedidos-diag.component';
import { PedidosDetailComponent } from './pedidos-detail/pedidos-detail.component';
import { AuthGuard } from '../share/guards/auth.guard';


const routes: Routes = [
  {path:'orden', component: PedidosIndexComponent,
  canActivate:[AuthGuard],
  data:{
    roles: ['ADMIN']
  }},

  {path:'orden/client', component: PedidosAllComponent,
  canActivate:[AuthGuard],
  data:{
    roles: ['USER']
  }},

  {path: 'orden/vendedor', component: PedidosClienteComponent,
  canActivate:[AuthGuard],
  data:{
    roles: ['SALES', 'ADMIN']
  }},

  {path:'orden/:id', component: PedidosDiagComponent,
  canActivate:[AuthGuard],
  data:{
    roles: ['ADMIN']
  }}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
