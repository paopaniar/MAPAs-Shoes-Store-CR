import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosAllComponent } from './pedidos-all/pedidos-all.component';
import { PedidosDetailComponent } from './pedidos-detail/pedidos-detail.component';
import { PedidosIndexComponent } from './pedidos-index/pedidos-index.component';


@NgModule({
  declarations: [
    PedidosAllComponent,
    PedidosDetailComponent,
    PedidosIndexComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule
  ]
})
export class PedidosModule { }
