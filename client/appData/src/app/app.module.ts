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
    PedidosModule,
    DashboardModule,
   // VideojuegoModule,
    //siempre de ultimo
    AppRoutingModule,
   BrowserAnimationsModule,
 

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptorService, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }