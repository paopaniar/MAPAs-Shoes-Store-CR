import { Component, Inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-pedidos-calificacion',
  templateUrl: './pedidos-calificacion.component.html',
  styleUrls: ['./pedidos-calificacion.component.css']
})
export class PedidosCalificacionComponent implements OnInit {
  datos:any;
  isAutenticated: boolean;
  submitted = false;
  respMetodoPago: any;
  idUsuario: number;
  formEvaluacion: FormGroup;
  datosDialog:any;
  currentUser: any;
  ordenProductos: any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef:MatDialogRef<PedidosCalificacionComponent>,
    private gService:GenericService,
    private formBuilder: FormBuilder,
    private noti: NotificacionService,
    private authService: AuthenticationService,
    private router: Router
  )
  { 
    this.formEvaluacion = this.formBuilder.group({
      comentario: ['', Validators.required], // Asegúrate de que coincida con el nombre de tu campo en el formulario HTML
      calificacionFinal: ['', Validators.required], // Asegúrate de que coincida con el nombre de tu campo en el formulario HTML
    });
    this.datosDialog=data;
    console.log(data.ordenProductos);
  }
  public errorHandling = (control: string, error: string) => {
    const formControl = this.formEvaluacion.get(control);
    return formControl ? formControl.hasError(error) : false;
  }

  createEvaluacion() {
    if (this.formEvaluacion.invalid) {
      return;
    } 
    this.submitted = true;
    this.formEvaluacion.patchValue({ usuarioId: this.idUsuario });
    console.log(this.formEvaluacion.value);
    if (this.formEvaluacion.invalid) {
      return;
    }
    this.formEvaluacion.value.usuarioId = this.idUsuario;
    this.formEvaluacion.value.ordenId = this.datosDialog.id;
    this.gService.create('evaluacion', this.formEvaluacion.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.noti.mensaje('Éxito!!',
        'Evaluación creada',
        TipoMessage.success)
        this.respMetodoPago = data;
        console.log(data);
        this.router.navigate(['orden/client']);
        this.dialogRef.close();
      });
  }

  obtenerOrdenPorId(id:any){
    console.log(id);
    this.gService
    .get('orden',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
        this.datos=data; 
        console.log(this.datos);
        this.ordenProductos = this.datos.ordenProductos;
    });
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => {
      this.currentUser = x;
      if (x && x.usuario) {
        this.idUsuario = x.usuario.id;
      }
    });
    }
}
