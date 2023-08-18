import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  ServerUrl = environment.apiURL;

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private authenticated = new BehaviorSubject<boolean>(false); 

  usuarioId: number;

  constructor(private http: HttpClient, private cartService:CartService) {
    //Obtener los datos del usuario en localStorage, si existe
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser'))
    );

    this.currentUser = this.currentUserSubject.asObservable();
    this.currentUser.subscribe((data) => {
      this.usuarioId = data.usuario.id
    })
    console.log(this.currentUser)
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  get isAuthenticated() {
    if (this.currentUserValue != null) {
      this.authenticated.next(true);
    } else {
      this.authenticated.next(false);
    }
    return this.authenticated.asObservable();
  }

  createUser(usuario: any): Observable<any> {
    return this.http.post<any>(this.ServerUrl + 'usuario/register', usuario);
  }

  loginUser(usuario: any): Observable<any> {
    return this.http.post<any>(this.ServerUrl + 'usuario/login', usuario).pipe(
      map((usuario) => {
        localStorage.setItem('currentUser', JSON.stringify(usuario.data));
        this.authenticated.next(true);
        this.currentUserSubject.next(usuario.data);
        return usuario;
      })
    );
  }

  logout() {
    let usuario = this.currentUserSubject.value;
    if (usuario) {
      // eliminar usuario del almacenamiento local para cerrar la sesión del usuario
      localStorage.removeItem('currentUser');
      //Eliminarlo del observable del usuario actual
      this.currentUserSubject.next(null);
      //Eliminarlo del observable del boleano si esta autenticado
      this.authenticated.next(false);
      //Eliminar carrito
      this.cartService.deleteCart();
      return true;
    }
    return false;
  }
 
}
