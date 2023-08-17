import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
  isAutenticated: boolean;
  id: number;
  usuario: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  inputDireccion: FormGroup;
  inputMetodoPago: FormGroup;
  submitted = false;
  currentUser: any;
  direcciones: any;

  constructor(
    private gService: GenericService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar) {
    let id = this.route.snapshot.paramMap.get('id');
    this.id = +id;
    if (!isNaN(Number(this.id))) {
      this.obtenerUsuario(Number(this.id));
    }
  }

  obtenerUsuario(id: number) {
    this.gService
      .get('usuario', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.usuario = data;
      });
  }

  updateDirecciones(newData: any) {
    this.direcciones.push(newData);
  }
  crearDireccion(): void {
    this.submitted = true;
  
    if (this.inputDireccion.invalid) {
      return;
    }
    this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
    this.authService.isAuthenticated.subscribe((valor)=>(this.isAutenticated=valor));
    const productId = this.id;
    const requestData = {
      mensaje: this.inputDireccion.value.pregunta,
      usuarioId: this.currentUser.user.id,
    };
  
    this.gService.create('usuario/direccion/' + productId, requestData)
    .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          // Handle the API response, if necessary
          this.updateDirecciones(data);
          this.router.navigate(['/usuario/perfil'], {
            queryParams: { create: 'true' }
          });
          this.showSuccessMessage('Dirección creada exitosamente!');
          
        },
        (error) => {
          // Handle the error here, you can log it or show a proper error message
          console.error('Error:', error);
        }
      );

  }
  crearMetodoPago(): void {
    this.submitted = true;
  
    if (this.inputMetodoPago.invalid) {
      return;
    }
    this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
    this.authService.isAuthenticated.subscribe((valor)=>(this.isAutenticated=valor));
    const productId = this.id;
    const requestData = {
      mensaje: this.inputMetodoPago.value.pregunta,
      usuarioId: this.currentUser.user.id,
    };
  
    this.gService.create('usuario/metodoPago/' + productId, requestData)
    .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          // Handle the API response, if necessary
          this.updateDirecciones(data);
          this.router.navigate(['/usuario/perfil'], {
            queryParams: { create: 'true' }
          });
          this.showSuccessMessage('Metodo de pago creado exitosamente!');
          
        },
        (error) => {
          // Handle the error here, you can log it or show a proper error message
          console.error('Error:', error);
        }
      );

  }
  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Set the duration for how long the snackbar should be visible
      panelClass: 'success-snackbar' // Optionally apply custom CSS class for styling
    });
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
