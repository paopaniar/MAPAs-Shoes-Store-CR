import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PedidosDiagComponent } from '../pedidos-diag/pedidos-diag.component';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-pedidos-cliente',
  templateUrl: './pedidos-cliente.component.html',
  styleUrls: ['./pedidos-cliente.component.css']
})
export class PedidosClienteComponent  implements AfterViewInit{
  isUser: boolean; 
  currentUser: any;
  isAutenticated: boolean;
  datos:any;//Guarda la respuesta del API
  destroy$: Subject<boolean>=new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource=new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['fechaOrden','cantidad','totalOrden','estado','acciones'];

  constructor(private gService:GenericService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private dialog: MatDialog) {

  }

  calculateCantidad(row: any): number {
    let cantidad = 0;
    if (row && row.ordenProductos) {
      for (let producto of row.ordenProductos) {
        cantidad += parseFloat(producto.cantidad);
      }
    }
    return cantidad;
  };
  calculateTotal(row: any): number {
    let total = 0;
    if (row && row.ordenProductos) {
      for (let producto of row.ordenProductos) {
        total += parseFloat(producto.subtotal);
      }
    }
    return total;
  };
  calculateIvaAsNumber(row: any): number {
    let iva = 0;
    if (row && row.ordenProductos) {
      for (let producto of row.ordenProductos) {
        iva += parseFloat(producto.iva) * parseFloat(producto.subtotal);
      }
    }
    return iva;
  };
  calculateAll(row: any): number {
    const total = this.calculateTotal(row);
    const iva = this.calculateIvaAsNumber(row);
    return total + iva;
  }
  ngAfterViewInit(): void {
    this.listaOrdenes();

  };
  //Llamar al API y obtener la lista de productos
  listaOrdenes(){
    //localhost:3000/producto/
    this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
    this.authService.isAuthenticated.subscribe((valor)=>(this.isAutenticated=valor));
    const clienteId = this.currentUser.usuario.id;
    this.gService
      .list(`orden/vendedor/${clienteId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        console.log(data);
        this.datos=data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
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
  //localhost:3000/videojuego/1
  detalleOrden(id:Number){
    console.log(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(PedidosDiagComponent, dialogConfig);
  }
  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
