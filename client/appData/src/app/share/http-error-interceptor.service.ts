import { Injectable } from '@angular/core';
import { 
  HttpEvent, HttpRequest, HttpHandler, 
  HttpInterceptor, HttpErrorResponse 
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';
import { NotificacionService, TipoMessage } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptorService implements HttpInterceptor {
  //Recuerde que es necesario llamarlo como Proveedor
  //en AppModule
  constructor(
    private auth: AuthenticationService,
    private noti: NotificacionService
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isExternalAPI = request.url.startsWith('https://ubicaciones.paginasweb.cr');
    const token = localStorage.getItem('token');
    if (token && !isExternalAPI) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ${token}',
        },
      });
    }

    //Capturar el error
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let message: string = null;
        //Códigos de estado HTTP con su respectivo mensaje
        switch (error.status) {
          case 400:
            message = 'Solicitud incorrecta';
            break;
          case 401:
            message = 'No autorizado';
            break;
          case 403:
            message = 'Acceso denegado';
            break;
          case 422:
            message = 'Se ha presentado un error';
            break;
        }
        //Mostrar un mensaje de error
        this.noti.mensaje('Error',error.status+' '+ message,TipoMessage.error);
        throw new Error(error.message);
      })
      );
    }
  }
