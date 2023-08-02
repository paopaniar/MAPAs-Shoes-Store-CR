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
import { MapasVendedorComponent } from './mapas-vendedor/mapas-vendedor.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MapasDiagComponent } from './mapas-diag/mapas-diag.component';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import {ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { MapasCreateComponent } from './mapas-create/mapas-create.component';
import { MapasRespuestasComponent } from './mapas-respuestas/mapas-respuestas.component';



@NgModule({
  declarations: [
    MapasIndexComponent,
    MapasAllComponent,
    MapasDetailComponent,
    MapasVendedorComponent,
    MapasDiagComponent,

    MapasCreateComponent,
    MapasRespuestasComponent
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
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
    MatRadioModule,
    MatExpansionModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  exports: [
    MapasVendedorComponent
  ]
})
export class MapasModule { }
