import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  orderForm: FormGroup;
  qtyItems = 0;
  subtotal=0;
  isUser: boolean; 
  selectedPaymentMethod: any;
  selectedAddress: any;
  currentUser: any;
  metodosPagoList: any;
  direccionesList: any;
  usuarioId: number = 0;
  impuesto = 0.13;
  displayedColumns: string[] = ['producto', 'precio', 'cantidad', 'subtotal','acciones'];
  dataSource = new MatTableDataSource<any>();
  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private noti: NotificacionService,
    private authService: AuthenticationService,
    private gService: GenericService,
    private router: Router
  ) {
    this.listaMetodosPago();
    this.listadirecciones();
    this.formularioReactive();
  }
  formularioReactive() {
    this.orderForm = this.fb.group({
      selectedPaymentMethod: [null, Validators.required],
      selectedAddress: [null, Validators.required]
    });
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
    console.log('Actualizando total (eliminarItem):', this.total);
    this.noti.mensaje('Pedido',
    'Producto eliminado',
    TipoMessage.warning)
  }
    listaMetodosPago() {
      this.authService.currentUser.subscribe((x) => {
        this.currentUser = x;
        if (x && x.usuario) {
          this.usuarioId = x.usuario.id;
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

actualizarSubtotal(element: any) {
  const stockDisponible = element.producto.cantidadDisponible;

  if (element.cantidad > 0 && element.cantidad <= stockDisponible) {
    element.subtotal = element.cantidad * element.precio;
  } else {
    element.subtotal = 0;
  }

  console.log('Actualizando subtotal:', element.subtotal);
  
  this.total = this.cartService.getTotal();
  console.log('Actualizando total:', this.total);
}



disponnibilidad(item: any) {
  if (item.producto && item.producto.cantidadDisponible !== undefined) {
    const stockDisponible = item.producto.cantidadDisponible;// Obtener el stock disponible del producto
  if (item.cantidad > 0 && item.cantidad <= stockDisponible) {
    // Verificar si la cantidad es válida y no excede el stock disponible
    this.cartService.updateCartItemQuantity(item.product, item.cantidad);
    this.total = this.cartService.getTotal();
    console.log('Actualizando total (disponnibilidad):', this.total);
  } else if (item.cantidad > stockDisponible) {
    this.noti.mensaje('Atención!', 'No existen artículos disponibles', TipoMessage.error);
  } else {
    this.noti.mensaje('Atención!', 'No hay suficientes artículos', TipoMessage.warning);
  }
}
}
listadirecciones() {
  this.authService.currentUser.subscribe((x) => {
    this.currentUser = x;
    if (x && x.usuario) {
    this.usuarioId = x.usuario.id;
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
  if (this.orderForm.invalid) {
    return;
  }

  let itemsCarrito = this.cartService.getItems;

  if (itemsCarrito.every(item => item.cantidad <= item.product.cantidadDisponible)) {
    let itemsCarrito = this.cartService.getItems;
    let detalles = itemsCarrito.map((x) => ({
      ['productoId']: x.idItem,
      ['cantidad']: x.cantidad,
      ['subtotal']: x.subtotal,
      ['total']: (x.subtotal + (x.cantidad*x.subtotal)*this.impuesto),
    }));
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.authService.isAuthenticated.subscribe((valor) => (this.isAutenticated = valor));
    let infoOrden = {
      'fechaOrden': new Date(this.fecha),
      'ordenProductos': detalles,
      'usuarioId': this.currentUser.usuario.id,
      'direccionId': this.selectedAddress,
      'metodoPagoId': this.selectedPaymentMethod,
    };
    console.log('currentUser:', this.currentUser);
    console.log('isAuthenticated:', this.isAutenticated);

    this.gService.create('orden', infoOrden).subscribe(
      (respuesta: any) => {
        this.router.navigate(['orden/client']);
        this.noti.mensaje('Orden', 'Orden registrada #' + respuesta.id, TipoMessage.success);
        this.cartService.deleteCart();
        this.total = this.cartService.getTotal();
      },
      (error) => {
        console.error(error); // Manejo de errores
        this.noti.mensaje('Atención!!', 'No se pudo registrar el pedido', TipoMessage.error);
      }
    );
  } else {
    this.noti.mensaje(
      'Atención!!',
      'No hay suficientes artículos disponibles',
      TipoMessage.warning
    );
  }
}

}