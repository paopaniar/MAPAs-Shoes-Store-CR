import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isAuthenticated:boolean;
  currentUser: any;
  constructor(private authService:AuthenticationService, 
    private router: Router) {
     
      this.authService.isAuthenticated.subscribe(
        (valor) => (this.isAuthenticated = valor)
      );
    
      this.authService.currentUser.subscribe((x) => (this.currentUser = x));
  }
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let url: string = state.url;
      return this.checkUserLogin(route, url);
    }
  
  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.isAuthenticated) {
      const userRoles = this.currentUser.usuario.roles;
      var roleIncl = false;
      if(route.data['habilitado']){
        if(!(route.data['roles'] === undefined)){
          for(let index = 0; index < userRoles.length; index++){
            if(route.data['roles'].includes(userRoles[index]['Rol'])){

            }
          }
          if(!(roleIncl)){
            this.router.navigate(['/usuario/login'],{
              queryParams:{auth: 'no'},
            });
            return false;
          }
        }
      }
      return true;
    }
    this.router.navigate(['/usuario/login'],{
      queryParams:{
      auth: 'no'
      },
    });
    return false;
  }
}
      // if (route.data['roles'].length && !route.data['roles'].includes(userRoles)) {
      //   this.router.navigate(['/usuario/login'], {
      //     //Parametro para mostrar mensaje en login
      //     queryParams: { auth: 'no' }
      //   });
        // return false;
    //   }
    //   return true;
    // } 

    // this.router.navigate(['/usuario/login'], {
    //   queryParams: { auth: 'no'}
    // });
  
