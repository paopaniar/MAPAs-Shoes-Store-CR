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
  categorias: any[] = [];
  itemsPerPage = 6;
  currentPage = 1;
  selectedCategory: string | undefined;
  sortByPriceAsc = false;
  sortByPriceDesc = false;
  isAutenticated: boolean;
  currentUser: any;  id: number;


  get displayedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.datos.slice(startIndex, endIndex);
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
    //valores de prueba
    this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
    this.authService.isAuthenticated.subscribe((valor)=>(this.isAutenticated=valor));
    this.id = this.currentUser.usuario.id;
    console.log('user', this.id)
    console.log('filter', this.filterDatos)
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
filterProductos(text: string) {
  if (!text) {
    this.filterDatos = this.datos;
  } else {
    this.filterDatos = this.datos.filter(producto =>
      producto?.nombreProducto.toLowerCase().includes(text.toLowerCase())
    );
  }
  console.log(this.filterDatos)
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
  const allCategories = data.flatMap(categoria => categoria.nombreCategoria);
  const uniqueCategories = [...new Set(allCategories)];
  return uniqueCategories;
}
filterProductsByCategory() {
  if (!this.selectedCategory) {
    // Si no se selecciona ninguna categoría, mostrar todos los productos
    this.filterDatos = this.datos;
  } else {
    // Filtrar productos por categoría
    this.filterDatos = this.datos.filter(producto =>
      producto.categorias.includes(this.selectedCategory)
    );
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
  comprar(id: number) {
    // Verificar si el usuario está autenticado
   
    // Si llegamos aquí, el usuario está autenticado y es un cliente
    // Realiza la lógica de compra
    this.gService
      .get('producto', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.cartService.addToCart(data);
        if (!this.isAutenticated) {
          this.notificacion.mensaje(
            'Atención!',
            'Inicie Sesión',
            TipoMessage.warning
          );   
          this.router.navigate(['usuario/login']);
          console.log('Usuario no autenticado');
          return;
        }
      
        // Verificar si el usuario es un cliente
        if (!this.esCliente()) {
          this.notificacion.mensaje(
            'Denagado!',
            'Debe iniciar sesión como Cliente',
            TipoMessage.warning
          );
          return;
        }
              this.notificacion.mensaje(
          'Orden',
          'Producto: ' + data.nombreProducto + ' agregado a la orden',
          TipoMessage.success
        );
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
