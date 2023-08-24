import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PedidosDiagComponent } from '../pedidos-diag/pedidos-diag.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { CartService } from 'src/app/share/cart.service';

@Component({
  selector: 'app-pedidos-all',
  templateUrl: './pedidos-all.component.html',
  styleUrls: ['./pedidos-all.component.css']
})
export class PedidosAllComponent implements AfterViewInit{
  datos:any;//Guarda la respuesta del API
  destroy$: Subject<boolean>=new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(NgbPaginationModule) currentPage !: NgbPaginationModule;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource=new MatTableDataSource<any>();
  isUser: boolean; 
  currentUser: any;
  isAutenticated: boolean;
  total=0;
  subtotal: number = 0.0;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'fechaOrden','totalOrden','estado','acciones'];

  constructor(private gService:GenericService,
    private router: Router,
    private cartService: CartService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private dialog: MatDialog) {
      this.total = 0;
      this.calculateTotalSubtotal();
    
  }

  calculateTotalSubtotal(): number {
    if (this.datos && this.datos.ordenProductos && this.datos.ordenProductos.length > 0) {
      // Utiliza el método reduce para sumar los precios de los productos
      this.subtotal = this.datos.ordenProductos.reduce((total, producto) => {
        if (producto.producto && producto.producto.precio) {
          total += parseFloat(producto.producto.precio);
        }
        return total;
      }, 0);
    } else {
      this.subtotal = 0.0; // Establece el subtotal en cero si no hay productos
    }
    return this.subtotal;
  }
  calculateTotalProducto(producto: any): number {
    const subtotal = parseFloat(producto.producto.precio) * producto.cantidad;
    return subtotal;
  }
    
  calculateTotalOrden(row: any): number {
    let total = 0;
    if (row.ordenProductos && row.ordenProductos.length > 0) {
      for (let producto of row.ordenProductos) {
        total += parseFloat(producto.producto.precio) * (producto.cantidad);
      }
    }
    return total;
  }
  calculateIva(): number {
    let iva = 0;
    if (this.datos && this.datos.ordenProductos) {
      for (let producto of this.datos.ordenProductos) {
        iva += parseFloat(producto.producto.precio)*0.13;
      }
    }
    return iva;
  }
  calculateIvaAsNumber(): number {
    let iva = 0;
    if (this.datos && this.datos.ordenProductos) {
      for (let producto of this.datos.ordenProductos) {
        iva += parseFloat(producto.producto.precio)*0.13;
      }
    }
    return iva;
  }
  calculateTotal(): number {
   return this.calculateTotalSubtotal() + this.calculateIvaAsNumber();
  }


  ngAfterViewInit(): void {
    this.listaOrdenes();
  }
  //Llamar al API y obtener la lista de productos
  listaOrdenes(){
    //localhost:3000/producto/
    this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
    this.authService.isAuthenticated.subscribe((valor)=>(this.isAutenticated=valor));
    const clienteId = this.currentUser.usuario.id;
    this.gService
      .list(`orden/client/${clienteId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        console.log(data);
        this.datos=data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
  }
  calcularTotalOrden(ordenProductos: any[]): number {
    if (ordenProductos && ordenProductos.length > 0) {
      // Utilizar el método reduce para sumar los precios de los productos
      return ordenProductos.reduce((total, producto) => {
        return total + (producto.producto.precio || 0);
      }, 0);
    } else {
      return 0; // Si no hay productos en la orden, el total es cero
    }
  }
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
