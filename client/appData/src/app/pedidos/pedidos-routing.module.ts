import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosAllComponent } from './pedidos-all/pedidos-all.component';
import { PedidosIndexComponent } from './pedidos-index/pedidos-index.component';
import { PedidosClienteComponent } from './pedidos-cliente/pedidos-cliente.component';
import { PedidosDiagComponent } from './pedidos-diag/pedidos-diag.component';
import { PedidosDetailComponent } from './pedidos-detail/pedidos-detail.component';


const routes: Routes = [
  {path:'orden', component: PedidosIndexComponent},

  {path:'orden/all', component: PedidosAllComponent},

  {path: 'orden/vendedor', component: PedidosClienteComponent},

  {path:'orden/:id', component: PedidosDiagComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
