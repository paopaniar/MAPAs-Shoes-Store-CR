import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-mapas-respuestas',
  templateUrl: './mapas-respuestas.component.html',
  styleUrls: ['./mapas-respuestas.component.css']
})
export class MapasRespuestasComponent {
  datos:any;
  datosDialog:any;
  consultaProductos: any;
  destroy$:Subject<boolean>= new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef:MatDialogRef<MapasRespuestasComponent>,
    private gService:GenericService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private formBuilder: FormBuilder, // Inject the formBuilder here
    private snackBar: MatSnackBar
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
  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Set the duration for how long the snackbar should be visible
      panelClass: 'success-snackbar' // Optionally apply custom CSS class for styling
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

//  ListaPreguntas(id:Number){
//   console.log(id);
//   const dialogConfig = new MatDialogConfig();
//   dialogConfig.disableClose = false;
//   dialogConfig.data = {
//     id: id,
//   };
//   this.dialog.open(MapasDiagComponent, dialogConfig);
// }

