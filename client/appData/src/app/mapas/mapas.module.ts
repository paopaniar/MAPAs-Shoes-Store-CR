import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapasRoutingModule } from './mapas-routing.module';
import { MapasIndexComponent } from './mapas-index/mapas-index.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    MapasIndexComponent
  ],
  imports: [
    CommonModule,
    MapasRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule
  ]
})
export class MapasModule { }
