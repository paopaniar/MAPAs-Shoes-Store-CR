import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  datos:any;//Guarda la respuesta del API
  destroy$: Subject<boolean>=new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource=new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'email', 'rol', 'estado', 'acciones'];

  constructor(
    private gService:GenericService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog) {

  }

  ngAfterViewInit(): void {
    this.listaUsuariosActivos();
  }
  //Llamar al API y obtener la lista de productos
  listaUsuariosActivos() {
    // Asumiendo que en la URL tienes un parámetro 'estado' para filtrar (1 para activos, 0 para inactivos)
    const estado = 1;
    this.gService
      .list(`usuario/activos/${estado}`) // Suponiendo que 'usuarios/:estado' es la ruta correcta para obtener usuarios filtrados
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.dataSource.data = this.datos; // Use .data to set the data for MatTableDataSource
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  actualizarEstado(usuario: any) {
    const nuevoEstado = usuario.estado === 1 ? 0 : 1;
    this.gService
      .update(`usuario/${usuario.id}`, { estado: nuevoEstado }) // Make sure 'usuario.id' is defined and valid
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        // Actualizar la lista después de la actualización
        this.listaUsuariosActivos();
      });
  }

  //localhost:3000/videojuego/1
  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
