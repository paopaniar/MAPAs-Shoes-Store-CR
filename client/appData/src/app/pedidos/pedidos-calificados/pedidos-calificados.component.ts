import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MapasDiagComponent } from 'src/app/mapas/mapas-diag/mapas-diag.component';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-pedidos-calificados',
  templateUrl: './pedidos-calificados.component.html',
  styleUrls: ['./pedidos-calificados.component.css']
})
export class PedidosCalificadosComponent  implements OnInit{

  datos:any;//Guarda la respuesta del API
  destroy$: Subject<boolean>=new Subject<boolean>();
  datosDialog:any;
  iconosArray: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef:MatDialogRef<MapasDiagComponent>,
    private gService:GenericService,
    private router: Router,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private formBuilder: FormBuilder, // Inject the formBuilder here
    private snackBar: MatSnackBar
  ) { 
    this.datosDialog=data;
    
  }

  obtenerCalifacdo(id:any){
    this.gService
    .get('evaluacion',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      console.log(data);
        this.datos=data; 
    });
  }


  ngOnInit(): void {
    if(this.datosDialog.id){
      this.obtenerCalifacdo(this.datosDialog.id);
    }
   
}
    
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
