import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { CartService, ItemCart } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
@Component({
  selector: 'app-pedidos-carrito',
  templateUrl: './pedidos-carrito.component.html',
  styleUrls: ['./pedidos-carrito.component.css']
})
export class PedidosCarritoComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  isAutenticated: boolean;
  total = 0;
  fecha = Date.now();
  qtyItems = 0;
  isUser: boolean; 
  selectedPaymentMethod: any;
  selectedAddress: any;
  currentUser: any;
  metodosPagoList: any;
  direccionesList: any;
  usuarioId: number = 0;

  displayedColumns: string[] = ['producto', 'precio', 'cantidad', 'subtotal','acciones'];
  dataSource = new MatTableDataSource<any>();
  constructor(
    private cartService: CartService,
    private noti: NotificacionService,
    private authService: AuthenticationService,
    private gService: GenericService,
    private router: Router
  ) {
    this.listaMetodosPago();
    this.listadirecciones();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
   this.cartService.currentDataCart$.subscribe(data=>{
    this.dataSource=new MatTableDataSource(data)
   })
   this.total=this.cartService.getTotal()
  }
  actualizarCantidad(item: any) {
    this.cartService.addToCart(item);
    this.total=this.cartService.getTotal();
  }
  eliminarItem(item: any) {
    this.cartService.removeFromCart(item);
    this.total=this.cartService.getTotal();
    this.noti.mensaje('Pedido',
    'Producto eliminado',
    TipoMessage.warning)
  }
    listaMetodosPago() {
      this.authService.currentUser.subscribe((x) => {
        this.currentUser = x;
        if (x && x.user) {
          this.usuarioId = x.user.id;
    this.metodosPagoList = null;
    this.gService
      .list('metodoPago/usuario/'+ this.usuarioId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.metodosPagoList = data;
        console.log('metods', this.metodosPagoList)
      });
    }
  });
}

listadirecciones() {
  this.authService.currentUser.subscribe((x) => {
    this.currentUser = x;
    if (x && x.user) {
    this.usuarioId = x.user.id;
    this.direccionesList = null;
    this.gService
  .list('direccion/usuario/'+ this.usuarioId)
  .pipe(takeUntil(this.destroy$))
  .subscribe((data: any) => {
    this.direccionesList = data;
    console.log('direccines', this.direccionesList)
  });
}
});
}


  registrarOrden() {
   if(this.cartService.getItems!=null){
      let itemsCarrito=this.cartService.getItems;
      let detalles=itemsCarrito.map(
        x=>({
          ['productoId']:x.idItem,
          ['cantidad']: x.cantidad,
        })
      );
      this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
      this.authService.isAuthenticated.subscribe((valor)=>(this.isAutenticated=valor));
      let infoOrden={
        'fechaOrden': new Date(this.fecha),
        'ordenProductos':detalles,  
        'usuarioId': this.currentUser.user.id,
        'direccionId': this.selectedAddress,
        'metodoPagoId': this.selectedPaymentMethod
      }
      console.log('currentUser:', this.currentUser);
      console.log('isAuthenticated:', this.isAutenticated);

      this.gService.create('orden',infoOrden)
      .subscribe((respuesta:any)=>{
        this.router.navigate(['orden/client']),
        this.noti.mensaje('Orden',
        'Orden registrada #'+respuesta.id,
        TipoMessage.success)
        this.cartService.deleteCart();
        this.total=this.cartService.getTotal();
        console.log(respuesta)
      })
   }else{
    this.noti.mensaje('Orden',
    'Agregue productos a la orden',
    TipoMessage.warning)
   }
  }
}
