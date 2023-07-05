import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosAllComponent } from './pedidos-all/pedidos-all.component';
import { PedidosIndexComponent } from './pedidos-index/pedidos-index.component';
import { PedidosClienteComponent } from './pedidos-cliente/pedidos-cliente.component';


const routes: Routes = [
  {path:'orden', component: PedidosIndexComponent},

  {path:'orden/all', component: PedidosAllComponent},

  {path: 'orden/vendedor', component: PedidosClienteComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
