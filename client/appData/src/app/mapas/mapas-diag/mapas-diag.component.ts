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
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-mapas-diag',
  templateUrl: './mapas-diag.component.html',
  styleUrls: ['./mapas-diag.component.css']
})
export class MapasDiagComponent implements OnInit{
  isAutenticated: boolean;
  datos:any;
  submitted = false;
  currentUser: any;
  inputPregunta: FormGroup;
  inputRespuesta: FormGroup;
  mensaje: any; 
  datosDialog:any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  consultaProductos: any;
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
  obtenerProducto(id:any){
    console.log(id);
   this.gService
  .get('producto', id)
  .pipe(takeUntil(this.destroy$))
  .subscribe((data: any) => {
    this.datos = data; 
    console.log(this.datos);
    this.consultaProductos = this.datos.consultaProductos;
  });

  }

  createQuestion() {
    // Assuming you have the necessary question data to be sent
    const questionData = {
      mensaje: 'Your question message here', // Replace with the actual question message
      productoId: this.datosDialog.id, // Assuming you want to associate the question with the product ID from the dialog data
      usuarioId: 1, // Replace with the actual user ID if needed
    };
  }


  createQuestion1(): void {
    this.submitted = true;
  
    if (this.inputPregunta.invalid) {
      return;
    }
    this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
    this.authService.isAuthenticated.subscribe((valor)=>(this.isAutenticated=valor));
    const productId = this.datosDialog.id;
    const requestData = {
      mensaje: this.inputPregunta.value.pregunta,
      usuarioId: this.currentUser.user.id,
    };
  
    this.gService.create('producto/pregunta/' + productId, requestData)
    .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          // Handle the API response, if necessary
          this.router.navigate(['/producto'], {
            queryParams: { create: 'true' }
          });
          this.showSuccessMessage('Pregunta creada exitosamente!');
        },
        (error) => {
          // Handle the error here, you can log it or show a proper error message
          console.error('Error:', error);
        }
      );
      this.close()
  }

  
  
  
  
  
  createAnswer1(preguntaId: number): void {
    this.submitted = true;

    if (this.inputRespuesta.invalid) {
        return;
    }
    this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
    this.authService.isAuthenticated.subscribe((valor)=>(this.isAutenticated=valor));
    const requestData = {
        respuesta: this.inputRespuesta.value.respuesta,
      };
      console.log('curretn user', this.currentUser.user.id)

    this.gService.create('producto/respuesta/' + preguntaId, requestData)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
            (data: any) => {
                // Handle the API response, if necessary
                this.router.navigate(['/producto/vendedor'], {
                    queryParams: { create: 'true' }
                });
                this.showSuccessMessage('Respuesta creada exitosamente!');
            },
            (error) => {
                // Handle the error here, you can log it or show a proper error message
                console.error('Error:', error);
            }
        );
        this.close()
}

  

  
  
  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Set the duration for how long the snackbar should be visible
      panelClass: 'success-snackbar' // Optionally apply custom CSS class for styling
    });
  }
  ngOnInit(): void {
    if (this.datosDialog && this.datosDialog.id) {
      this.obtenerProducto(this.datosDialog.id);
    }
    
    this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
    this.authService.isAuthenticated.subscribe((valor)=>(this.isAutenticated=valor));
    this.inputPregunta = this.formBuilder.group({
      pregunta: ['', [Validators.required, Validators.maxLength(20)]]
    });
    console.log(this.currentUser.user)
    this.inputRespuesta = this.formBuilder.group({
      respuesta: ['', [Validators.required, Validators.maxLength(20)]]
    });
    console.log(this.currentUser)
  }

  isUser():boolean{
    return  this.currentUser.user.rol === "SALES";
  }
  
  close(){
    //Dentro de close ()
     //this.form.value 
    this.dialogRef.close();
  }
}
