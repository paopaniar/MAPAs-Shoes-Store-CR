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
  totalSubtotal: number = 0;



  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef:MatDialogRef<PedidosDiagComponent>,
    private gService:GenericService
  ) { 
    
    this.datosDialog=data;
    console.log(data.ordenProductos);
  }
  calculateTotalSubtotal(): number {
    let totalSubtotal = 0;
    if (this.datos && this.datos.ordenProductos) {
      for (let producto of this.datos.ordenProductos) {
        totalSubtotal += parseFloat(producto.subtotal);
      }
    }
    return totalSubtotal;
  }
  calculateIva(): number {
    let iva = 0;
    if (this.datos && this.datos.ordenProductos) {
      for (let producto of this.datos.ordenProductos) {
        iva += parseFloat(producto.iva);
      }
    }
    return iva;
  }
  calculateIvaAsNumber(): number {
    let iva = 0;
    if (this.datos && this.datos.ordenProductos) {
      for (let producto of this.datos.ordenProductos) {
        iva += parseFloat(producto.iva)*this.calculateTotalSubtotal();
      }
    }
    return iva;
  }
  calculateTotal(): number {
   return this.calculateTotalSubtotal() + this.calculateIvaAsNumber();
  }


  obtenerOrdenDetalle(id:any){
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
    if(this.datosDialog.id){
      this.obtenerOrdenDetalle(this.datosDialog.id);
    }
    this.calculateTotalSubtotal();
  }

  close(){
    this.dialogRef.close();
  }
}
