import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MapasDiagComponent } from '../mapas-diag/mapas-diag.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MapasRespuestasComponent } from '../mapas-respuestas/mapas-respuestas.component';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { MapasFotografiasComponent } from '../mapas-fotografias/mapas-fotografias.component';

@Component({
  selector: 'app-mapas-vendedor',
  templateUrl: './mapas-vendedor.component.html',
  styleUrls: ['./mapas-vendedor.component.css']
})
export class MapasVendedorComponent implements AfterViewInit{
  datos:any;//Guarda la respuesta del API
  destroy$: Subject<boolean>=new Subject<boolean>();
  submitted = false;
  inputRespuesta: FormGroup;
  mensaje: any;
  datosDialog:any;
  consultaProductos: any;
  isUser: boolean; 
  currentUser: any;
  isAutenticated: boolean;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource=new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nombreProducto', 'categoriaId','cantidadDisponible','acciones'];
  constructor(private gService:GenericService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder, // Inject the formBuilder here
    private snackBar: MatSnackBar) {
  }

  ngAfterViewInit(): void {
    this.listaProductos();
  }
  //Llamar al API y obtener la lista de productos
  listaProductos(){
    //localhost:3000/producto/
    this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
    this.authService.isAuthenticated.subscribe((valor)=>(this.isAutenticated=valor));
    const vendedorId = this.currentUser.usuario.id;
    this.gService
      .list(`producto/vendedor/${vendedorId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        console.log(data);
        this.datos=data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
       
      })
  }
  //localhost:3000/videojuego/1
  detalleProducto(id:Number){
    console.log(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(MapasRespuestasComponent, dialogConfig);
  }
  asignarFotoProducto(id:Number){
    console.log(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(MapasFotografiasComponent, dialogConfig);
  }
  actualizarVideojuego(id: number) {
    this.router.navigate(['/producto/update', id], {
      relativeTo: this.route,
    });
  }
  listaPreguntas(id:Number){
    console.log(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(MapasDiagComponent, dialogConfig);
  }

  createAnswer1(): void {
    this.submitted = true;
  
    if (this.inputRespuesta.invalid) {
      return;
    }
  
    const productId = this.datosDialog.id;
    const requestData = {
      mensaje: this.inputRespuesta.value.respuesta, // Access the pregunta value from the form
    };
  
    this.gService.create('producto/pregunta/' + productId, requestData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          // Handle the API response, if necessary
          this.router.navigate(['/producto'], {
            queryParams: { create: 'true' }
          });
          this.showSuccessMessage('Respuesta creada exitosamente!');
        },
        (error) => {
          // Handle the error here, you can log it or show a proper error message
          console.error('Error:', error);
        }
      );
  }
  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Set the duration for how long the snackbar should be visible
      panelClass: 'success-snackbar' // Optionally apply custom CSS class for styling
    });
  }
  
  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
