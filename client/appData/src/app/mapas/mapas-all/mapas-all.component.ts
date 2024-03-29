import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MapasDiagComponent } from '../mapas-diag/mapas-diag.component';


@Component({
  selector: 'app-mapas-all',
  templateUrl: './mapas-all.component.html',
  styleUrls: ['./mapas-all.component.css']
})
export class MapasAllComponent implements AfterViewInit{
  datos:any;//Guarda la respuesta del API
  destroy$: Subject<boolean>=new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource=new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nombreProducto', 'precio','usuarioId','acciones'];

  constructor(
    private gService:GenericService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog) {

  }

  ngAfterViewInit(): void {
    this.listaProductos();
  }
  //Llamar al API y obtener la lista de productos
  listaProductos(){
    //localhost:3000/producto/
    this.gService
      .list('producto/')
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
    this.dialog.open(MapasDiagComponent, dialogConfig);
  }
  crearVideojuego() {
    this.router.navigate(['/producto/crear'], {
      relativeTo: this.route,
    });
  }
  actualizarVideojuego(id: number) {
    this.router.navigate(['/producto/update', id], {
      relativeTo: this.route,
    });
  }
  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
