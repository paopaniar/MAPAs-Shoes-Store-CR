import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { CartService } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import { PedidosCalificacionComponent } from '../pedidos-calificacion/pedidos-calificacion.component';

@Component({
  selector: 'app-pedidos-evaluacion',
  templateUrl: './pedidos-evaluacion.component.html',
  styleUrls: ['./pedidos-evaluacion.component.css']
})
export class PedidosEvaluacionComponent implements AfterViewInit{
  datos:any;//Guarda la respuesta del API
  destroy$: Subject<boolean>=new Subject<boolean>();
  dataSource=new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(NgbPaginationModule) currentPage !: NgbPaginationModule;
  isUser: boolean; 
  currentUser: any;
  isAutenticated: boolean;
  total=0;
  subtotal: number = 0.0;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'fechaOrden','estado','acciones'];
  ngAfterViewInit(): void {
    this.listaOrdenes();
  }

  constructor(private gService:GenericService,
    private router: Router,
    private cartService: CartService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private dialog: MatDialog) {
      this.total = 0;
  }

  listaOrdenes(){
    const estado = 0;
    this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
    this.authService.isAuthenticated.subscribe((valor)=>(this.isAutenticated=valor));
    const clienteId = this.currentUser.usuario.id;
    this.gService
      .list(`orden/finalizados/${clienteId}/${estado}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        console.log(data);
        this.datos=data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
  }

  
  idOrden(id:Number){
    console.log(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(PedidosCalificacionComponent, dialogConfig);
  }
  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
