import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { FlexLayoutModule } from "@angular/flex-layout";
import { trigger, transition, style, animate } from '@angular/animations';
import { HomeRoutingModule } from './home-routing.module';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';
import { InicioComponent } from './inicio/inicio.component';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { CardComponent } from './card/card.component';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { NgbdCarouselPause } from '../carousel-pause/carousel-pause.component';


@NgModule({
  declarations: [
    AcercaDeComponent,
    InicioComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    FlexLayoutModule,
    NgbCarousel,
    NgbdCarouselPause
  ],
  bootstrap: [InicioComponent]

})
export class HomeModule { }
