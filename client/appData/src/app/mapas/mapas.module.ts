import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapasRoutingModule } from './mapas-routing.module';
import { MapasIndexComponent } from './mapas-index/mapas-index.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { MapasAllComponent } from './mapas-all/mapas-all.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';  
import { MatDialogModule } from '@angular/material/dialog';
import { MapasDetailComponent } from './mapas-detail/mapas-detail.component';
import { MapasDiagComponent } from './mapas-diag.component.css/mapas-diag.component';
import { MapasVendedorComponent } from './mapas-vendedor/mapas-vendedor.component';


@NgModule({
  declarations: [
    MapasIndexComponent,
    MapasAllComponent,
    MapasDetailComponent,
    MapasDiagComponent,
    MapasVendedorComponent
  ],
  imports: [
    CommonModule,
    MapasRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule
  ],
  exports: [
    MapasVendedorComponent
  ]
})
export class MapasModule { }