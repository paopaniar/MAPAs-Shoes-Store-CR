import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';



@Component({
  selector: 'app-mapas-diag',
  templateUrl: './mapas-diag.component.html',
  styleUrls: ['./mapas-diag.component.css']
})
export class MapasDiagComponent implements OnInit{
  datos:any;
  datosDialog:any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  consultaProductos: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef:MatDialogRef<MapasDiagComponent>,
    private gService:GenericService
  ) { 
    this.datosDialog=data;
    
  }
  obtenerProducto(id:any){
    console.log(id);
    this.gService
    .get('producto',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
        this.datos=data; 
        console.log(this.datos);
        this.consultaProductos = this.datos.consultaProductos;
    });
   
  }
  ngOnInit(): void {
    if(this.datosDialog.id){
      this.obtenerProducto(this.datosDialog.id);
    }
  }
  
  close(){
    //Dentro de close ()
     //this.form.value 
    this.dialogRef.close();
  }
}
