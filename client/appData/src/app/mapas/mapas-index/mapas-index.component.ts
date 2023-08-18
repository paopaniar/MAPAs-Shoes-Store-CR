import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MapasDiagComponent } from '../mapas-diag/mapas-diag.component';
import { CartService } from 'src/app/share/cart.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-mapas-index',
  templateUrl: './mapas-index.component.html',
  styleUrls: ['./mapas-index.component.css']
  
})
export class MapasIndexComponent implements OnInit{
  datos:any;//Guarda la respuesta del API
  destroy$: Subject<boolean>=new Subject<boolean>();
  filterDatos: any;
  itemsPerPage = 6;
  currentPage = 1;
  sortByPriceAsc = false;
  sortByPriceDesc = false;
  categorias: any[] = [];
  isAutenticated: boolean;
  currentUser: any;  id: number;


  get displayedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.datos.slice(startIndex, endIndex);
  }


  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  animationActive = false;

startAnimation() {
  this.animationActive = true;
}

stopAnimation() {
  this.animationActive = false;
}
filterProducto(text: string) {
  // Filter based on text and category
  if (!text) {
    this.filterDatos = this.datos;
  } else {
    this.filterDatos = this.datos.filter(producto =>
      producto?.nombreProducto.toLowerCase().includes(text.toLowerCase())
    );
  }
}
sortProductsByPrice() {
  if (this.sortByPriceAsc) {
    this.filterDatos.sort((a, b) => a.precio - b.precio);
    this.sortByPriceAsc = false;
    this.sortByPriceDesc = true;
  } else if (this.sortByPriceDesc) {
    this.filterDatos.sort((a, b) => b.precio - a.precio);
    this.sortByPriceAsc = true;
    this.sortByPriceDesc = false;
  }
}

  
  nextPage() {
    const totalPages = Math.ceil(this.datos.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }
  
  
  constructor(private gService:GenericService,
    private router: Router,
    private route: ActivatedRoute,
    private cartService:CartService,
    private authService: AuthenticationService,
    private notificacion:NotificacionService,
    private dialog: MatDialog){
    this.listaZapatos() 

  }
  ngOnInit(): void {
    this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
    this.authService.isAuthenticated.subscribe((valor)=>(this.isAutenticated=valor));
    this.id = this.currentUser.usuario.id;
  }
  
  //lista de zapatos es la table producto
  listaZapatos(){
    //localhost:3000/producto/
    this.gService
      .list('producto/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        console.log(data);
        this.datos=data;
        this.filterDatos=this.datos;
        this.categorias = this.extractCategories(data);
      })
  }
  // Create a method to extract unique categories from the data
extractCategories(data: any[]): any[] {
  const allCategories = data.flatMap(producto => producto.categorias);
  const uniqueCategories = [...new Set(allCategories)];
  return uniqueCategories;
}
  
  filterProductos(text:string){
    if(!text){
      this.filterDatos=this.datos
    }else{
      this.filterDatos=this.datos.filter(
        producto=> producto?.nombreProducto.toLowerCase().
                            includes(text.toLowerCase())
      )
    }
  }
  detalleProducto(id:Number){
    console.log(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(MapasDiagComponent, dialogConfig);
  }
  comprar(id:number){
    this.gService
    .get('producto',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      //Agregar videojuego obtenido del API al carrito
      this.cartService.addToCart(data);
      //Notificar al usuario
      this.notificacion.mensaje(
        'Orden',
        'Producto: '+data.nombreProducto+ ' agregado a la orden',
        TipoMessage.success
      )
    });
  }
  esCliente() {
    const roleses = this.currentUser.usuario.roles || [];
    return roleses.some(roles => roles.descripcion === 'Cliente');
  }
  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
