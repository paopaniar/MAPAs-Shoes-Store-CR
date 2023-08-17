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
  selectedMetodoPago : number = 0;
  provinciasList: any;
  cantonesList: any;
  provinceNames: string[] = []
  cantonesNames: string[] = []
  fecha = Date.now();
  metodosPagoList: any;
  qtyItems = 0;
  isUser: boolean; 
  currentUser: any;
  selectedProvinceId: string | null = null;
  selectedCantonName: string | null = null;

  //Tabla
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
    // this.listaProvincias();
    // this.listaCantones(this.selectedProvinceId);

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
   /*  this.noti.mensaje('Orden',
    'Cantidad actualizada: '+item.cantidad,
    TipoMessage.info) */
  }
  eliminarItem(item: any) {
    this.cartService.removeFromCart(item);
    this.total=this.cartService.getTotal();
    this.noti.mensaje('Pedido',
    'Producto eliminado',
    TipoMessage.warning)
  }

  listaMetodosPago() {
    this.metodosPagoList = null;
    this.gService
      .list('metodoPago')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.metodosPagoList = data;
      });
  }




  // filterProvinceNames(data: any): string[] {
  //   const provinceNames: string[] = [];
  
  //   for (const provinceId in data.provincias) {
  //     if (data.provincias.hasOwnProperty(provinceId)) {
  //       const province = data.provincias[provinceId];
  //       provinceNames.push(province.nombre);
  //     }
  //   }
  
  //   return provinceNames;
  // }

  // filterCantonesNames(data: any, selectedProvinceId: string): string[] {
  //   const cantonNames: string[] = [];
  
  //   const selectedProvince = data.provincias[selectedProvinceId];
  //   if (selectedProvince && selectedProvince.cantones) {
  //     for (const cantonId in selectedProvince.cantones) {
  //       if (selectedProvince.cantones.hasOwnProperty(cantonId)) {
  //         const canton = selectedProvince.cantones[cantonId];
  //         cantonNames.push(canton.nombre);
  //       }
  //     }
  //   }
  
  //   return cantonNames;
  // }
  // selectProvince(provinceId: string) {
  //   this.selectedProvinceId = provinceId;
  //   this.listaCantones(provinceId); 
  // }
  // listaCantones(selectedProvinceId: string) {
  //   this.cantonesList = null;
  //   this.gService
  //     .list('direccion')
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((data: any) => {
  //       this.cantonesList = data;
  //       this.cantonesNames = this.filterCantonesNames(data, selectedProvinceId);
  //       console.log('cantones', this.cantonesNames);
  //     });
  // }
  
  // listaProvincias() {
  //   this.provinciasList = null;
  //   this.gService
  //     .list('direccion')
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((data: any) => {
  //       this.provinciasList = data;
  //       this.provinceNames = this.filterProvinceNames(data); // Store filtered names
  //     });
  // }
  
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
        'metodoPagoId': this.selectedMetodoPago.toString(),
      }
      console.log('currentUser:', this.currentUser);
      console.log('isAuthenticated:', this.isAutenticated);
      console.log('Metodo de pago', this.selectedMetodoPago);

      this.gService.create('orden',infoOrden)
      .subscribe((respuesta:any)=>{
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
