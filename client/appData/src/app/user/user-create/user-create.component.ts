import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GenericService } from 'src/app/share/generic.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificacionService } from 'src/app/share/notification.service';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {
  hide = true;
  usuario: any;
  roles: any;
  rolesList: any;
  formCreate: FormGroup;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private authService: AuthenticationService
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.formCreate = this.fb.group({
      nombre: ['', [Validators.required]],
      identificacion: ['', [Validators.required,Validators.pattern('^[0-9]*$'), Validators.minLength(9)]],
      primerApellido: ['', [Validators.required]],
      segundoApellido: [''],
      email: ['', [Validators.required, Validators.email]],
      contrasenna: ['', [Validators.required]],
      roles: ['', [Validators.required]],
    });
    this.listaRoles();
  }

  listaRoles() {
    this.rolesList = null;
    this.gService
      .list('rol')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.rolesList = data.filter((rol: any) => rol.descripcion !== 'Administrador'); 
      });
  }

  ngOnInit(): void {}

  submitForm() {
    this.makeSubmit=true;
    
    if(this.formCreate.invalid){
     return;
    }
    const formData = { ...this.formCreate.value, roles: this.formCreate.value.roles.map((rol) => parseInt(rol)),
     };
     console.log('roles', this.rolesList )
    this.authService.createUser(formData).subscribe((respuesta: any) => {
      this.usuario=respuesta;
      this.router.navigate(['/usuario/login'],{
        queryParams:{register:'true'},
      })
    })
  }
  onReset() {
    this.formCreate.reset();
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  };
}
