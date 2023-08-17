import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/share/api.service';

@Component({
  selector: 'app-pedidos-direccion',
  templateUrl: './pedidos-direccion.component.html',
  styleUrls: ['./pedidos-direccion.component.css']
})
export class PedidosDireccionComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Agregar';
  direccionInfo: any;
  currentUser: any;
  respDireccion: any;
  idUsuario: number;
  submitted = false;
  direccionForm: FormGroup;
  idDireccion: number = 0;
  isCreate: boolean = true;
  provincias: any;
  cantones: any;
  distritos: any;

constructor(
  private fb: FormBuilder,
  private gService: GenericService,
  private activeRouter: ActivatedRoute,
  private router: Router,
  private authService: AuthenticationService,
  private apiService: ApiService
) {
  this.formularioReactive();
  this.obtenerProvincias();
}
ngOnInit(): void {
  this.authService.currentUser.subscribe((x) => {
    this.currentUser = x;
    if (x && x.usuario) {
      this.idUsuario = x.usuario.id;
    }
  });

  this.activeRouter.params.subscribe((params: Params) => {
    this.idDireccion = params['id'];
    if (this.idDireccion != undefined) {
      this.isCreate = false;
      this.titleForm = 'Actualizar';
      this.gService.get('direccion', this.idDireccion)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.direccionInfo = data;
          this.direccionForm.patchValue({
            id: this.direccionInfo.id,
            provincia: this.direccionInfo.provincia,
            canton: this.direccionInfo.canton,
            distrito: this.direccionInfo.distrito,
            barrio: this.direccionInfo.barrio,
            otrasSennas: this.direccionInfo.otrasSennas,
            usuarioId: this.direccionInfo.usuarioId,
          });
        });
    }
  });
}

formularioReactive() {
  this.direccionForm = this.fb.group({
    id: [null],
    provincia: [null, Validators.required],
    canton: [null, Validators.required],
    distrito: [null, [Validators.required]],
    otrasSennas: [null, [Validators.required]],
    usuarioId: [null, Validators.required],
  });
}

obtenerProvincias() {
  this.apiService.obtenerProvincias().subscribe((data: any) => {
    this.provincias = Object.entries(data).map(([id, nombre]) => ({ id, nombre }));
  });
}

obtenerCantones(idProvincia: string) {
  this.apiService.obtenerCantones(idProvincia).subscribe((data) => {
    this.cantones = Object.entries(data).map(([id, nombre]) => ({ id, nombre, provinciaId: idProvincia }));
  });
  this.distritos = [];
}

obtenerDistritos(idProvincia: string, idCanton: string) {
  this.apiService.obtenerDistritos(idProvincia, idCanton).subscribe((data) => {
    this.distritos = Object.entries(data).map(([id, nombre]) => ({ id, nombre }));
  });
}
public errorHandling = (control: string, error: string) => {
  return this.direccionForm.controls[control].hasError(error);
}

crearDireccion() {
  this.submitted = true;
  this.direccionForm.patchValue({ usuarioId: this.idUsuario });
  console.log(this.direccionForm.value);
  if (this.direccionForm.invalid) {
    return;
  }
  this.direccionForm.value.usuarioId = this.idUsuario;
  this.gService.create('direccion', this.direccionForm.value)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      this.respDireccion = data;
      console.log(data);
      this.router.navigate(['/usuario']);
    });
}
onReset() {
  this.submitted = false;
  this.direccionForm.reset();
}

onBack() {
  this.router.navigate(['/usuario']);
}

ngOnDestroy() {
  this.destroy$.next(true);
  this.destroy$.unsubscribe();
}
}