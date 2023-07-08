import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-pedidos-diag',
  templateUrl: './pedidos-diag.component.html',
  styleUrls: ['./pedidos-diag.component.css']
})
export class PedidosDiagComponent implements OnInit{
  datos:any;
  datosDialog:any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  ordenProductos: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef:MatDialogRef<PedidosDiagComponent>,
    private gService:GenericService
  ) { 
    this.datosDialog=data;
  }
  obtenerOrdenDetalle(id:any){
    console.log(id);
    this.gService
    .get('orden',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
        this.datos=data; 
        this.ordenProductos = this.datos.ordenProductos;
    });
   
  }
  ngOnInit(): void {
    if(this.datosDialog.id){
      this.obtenerOrdenDetalle(this.datosDialog.id);
    }
  }

  close(){
    this.dialogRef.close();
  }
}
