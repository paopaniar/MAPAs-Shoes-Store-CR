import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pedidos-cliente',
  templateUrl: './pedidos-cliente.component.html',
  styleUrls: ['./pedidos-cliente.component.css']
})
export class PedidosClienteComponent  implements AfterViewInit{
  datos:any;//Guarda la respuesta del API
  destroy$: Subject<boolean>=new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource=new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['fechaOrden', 'direccionId','metodoPagoId','usuarioId','estado','acciones'];

  constructor(private gService:GenericService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngAfterViewInit(): void {
    this.listaOrdenes();
  }
  //Llamar al API y obtener la lista de productos
  listaOrdenes(){
    //localhost:3000/producto/
   
    this.gService
      .list('orden/')
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
  detalleOrden(id:Number){
    this.router.navigate(['/orden',id],
    {
      relativeTo:this.route
    })
  }
  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
