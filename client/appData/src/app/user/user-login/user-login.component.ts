import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  hide=true;
  formulario: FormGroup;
  makeSubmit: boolean = false;
  infoUsuario: any;

  constructor(
    public fb: FormBuilder,
    private authService: AuthenticationService,
    private notificacion: NotificacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.reactiveForm();
  }
  // Definir el formulario con su reglas de validación
  reactiveForm() {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasenna: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.mensajes();
  }

  mensajes() {
    let register = false;
    let auth = '';
    this.route.queryParams.subscribe((params) => {
      register = params['register'] === 'true' || false;
      auth = params['auth'] || '';
      if (register) {
        this.notificacion.mensaje(
          'Usuario registrado',
          'Especifique sus credenciales',
          TipoMessage.success
        )
      }
      if (auth) {
        this.notificacion.mensaje(
          'Usuario',
          'Acceso denegado',
          TipoMessage.warning
        )
      }
    });
  }

  onReset() {
    this.formulario.reset();
  }
  submitForm() {
    this.makeSubmit = true;
    if (this.formulario.invalid) {
      return;
    }

  this.authService.loginUser(this.formulario.value).subscribe(
    (usuario: any) => {
      if (usuario.data.usuario.estado == 1) {
        this.router.navigate(['/']);
      } else {
        this.notificacion.mensaje(
          'Usuario',
          'Acceso denegado: El usuario está inactivo',
          TipoMessage.warning
        );
      }
    },
    (error: any) => {
      console.error('Error en inicio de sesión:', error);
    }
  );
}

  public errorHandling = (control: string, error: string) => {
    return (
      this.formulario.controls[control].hasError(error) &&
      this.formulario.controls[control].invalid &&
      (this.makeSubmit || this.formulario.controls[control].touched)
    );
  };
}
