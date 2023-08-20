import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosAllComponent } from './pedidos-all/pedidos-all.component';
import { PedidosIndexComponent } from './pedidos-index/pedidos-index.component';
import { PedidosClienteComponent } from './pedidos-cliente/pedidos-cliente.component';
import { PedidosDiagComponent } from './pedidos-diag/pedidos-diag.component';
import { PedidosCalificacionComponent } from './pedidos-calificacion/pedidos-calificacion.component';
import { PedidosCarritoComponent } from './pedidos-carrito/pedidos-carrito.component';
import { PedidosDetailComponent } from './pedidos-detail/pedidos-detail.component';
import { AuthGuard } from '../share/guards/auth.guard';
import { PedidosEvaluacionComponent } from './pedidos-evaluacion/pedidos-evaluacion.component';
import { PedidosCalificadosComponent } from './pedidos-calificados/pedidos-calificados.component';

const routes: Routes = [
  {path:'orden', component: PedidosIndexComponent,
  canActivate:[AuthGuard],
  data:{
    descripcion: ['Administrador']
  }},

  {path:'orden/client', component: PedidosAllComponent,
  canActivate:[AuthGuard],
  data:{
    roles: ['Cliente']
  }},

  {path: 'orden/vendedor', component: PedidosClienteComponent,
  canActivate:[AuthGuard],
  data:{
    roles: ['Vendedor', 'Administrador']
  }},

  {path:'orden/:id', component: PedidosDiagComponent,
  canActivate:[AuthGuard],
  data:{
    roles: ['Administrador']
  }},

  {path: 'ordenProducto', component: PedidosCarritoComponent,
  canActivate:[AuthGuard],
    data:{
      roles: ['Cliente']
    }
  },
  {path:'pedido/finalizados', component: PedidosEvaluacionComponent,
  canActivate:[AuthGuard],
  data:{
    roles: ['Cliente']
  }},
  {path:'pedido/calificador', component: PedidosCalificacionComponent,
  canActivate:[AuthGuard],
  data:{
    roles: ['Cliente']
  }},
  {path:'pedido/calificado', component: PedidosCalificadosComponent,
  canActivate:[AuthGuard],
  data:{
    roles: ['Vendedor']
  }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
