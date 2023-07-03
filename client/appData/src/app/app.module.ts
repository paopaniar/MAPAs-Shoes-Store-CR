import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MapasModule } from './mapas/mapas.module';
import { HttpClientModule } from '@angular/common/http';
import { PedidosModule } from './pedidos/pedidos.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    
    CoreModule,
    ShareModule,
    //todos los demas
    HomeModule,
    UserModule,
    MapasModule,
   // VideojuegoModule,
    //siempre de ultimo
    AppRoutingModule,
   BrowserAnimationsModule,
   PedidosModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
