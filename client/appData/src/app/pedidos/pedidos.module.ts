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
import { PedidosIndexComponent } from './pedidos-index/pedidos-index.component';
import { PedidosClienteComponent } from './pedidos-cliente/pedidos-cliente.component';
import { PedidosDiagComponent } from './pedidos-diag/pedidos-diag.component';
import { PedidosDetailComponent } from './pedidos-detail/pedidos-detail.component';
import { PedidosCarritoComponent } from './pedidos-carrito/pedidos-carrito.component';
 
import {MatButtonModule} from '@angular/material/button'; 
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PedidosAllComponent,
    PedidosIndexComponent,
    PedidosClienteComponent,
    PedidosDiagComponent,
    PedidosDetailComponent,
    PedidosCarritoComponent,
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
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule, ReactiveFormsModule,
  ]
})
export class PedidosModule { }
