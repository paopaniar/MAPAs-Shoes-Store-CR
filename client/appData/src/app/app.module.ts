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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PedidosModule } from './pedidos/pedidos.module';
import { HttpErrorInterceptorService } from './share/http-error-interceptor.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { DatePipe } from '@angular/common';
import { MetodoPagoModule } from './metodo-pago/metodo-pago.module';
import { MetodoPagoFormComponent } from './metodoPago/metodo-pago-form/metodo-pago-form.component';


@NgModule({
  declarations: [
    AppComponent,
    MetodoPagoFormComponent
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
    PedidosModule,
    DashboardModule,
   // VideojuegoModule,
    //siempre de ultimo
    AppRoutingModule,
   BrowserAnimationsModule,
   MetodoPagoModule,
 

  ],
  providers: [
    DatePipe,{
    provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptorService, multi: true
  }],
  bootstrap: [AppComponent],
  exports: [
    MetodoPagoFormComponent
  ]
})
export class AppModule { }