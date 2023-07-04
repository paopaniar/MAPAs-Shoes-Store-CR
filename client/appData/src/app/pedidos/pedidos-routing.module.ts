import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosAllComponent } from './pedidos-all/pedidos-all.component';
import { PedidosDetailComponent } from './pedidos-detail/pedidos-detail.component';
import { PedidosIndexComponent } from './pedidos-index/pedidos-index.component';
import { PedidosVendedorComponent } from './pedidos-vendedor/pedidos-vendedor.component';

const routes: Routes = [
  {path:'orden', component: PedidosIndexComponent},

  {path:'orden/all', component: PedidosAllComponent},

  {path:'orden/:id', component: PedidosDetailComponent},
  
  {path: 'orden/vendedor', component: PedidosVendedorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
