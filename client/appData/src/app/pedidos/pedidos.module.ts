import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';  
import { MatDialogModule } from '@angular/material/dialog';
import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosAllComponent } from './pedidos-all/pedidos-all.component';
import { PedidosDetailComponent } from './pedidos-detail/pedidos-detail.component';
import { PedidosIndexComponent } from './pedidos-index/pedidos-index.component';
import { PedidosVendedorComponent } from './pedidos-vendedor/pedidos-vendedor.component';


@NgModule({
  declarations: [
    PedidosAllComponent,
    PedidosDetailComponent,
    PedidosIndexComponent,
    PedidosVendedorComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule
  ]
})
export class PedidosModule { }
