import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MapasDiagComponent } from '../mapas-diag/mapas-diag.component';
import { CartService } from 'src/app/share/cart.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  categoriasList: any;
  filtroForm: FormGroup;
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
    private fb: FormBuilder,
    private cartService:CartService,
    private authService: AuthenticationService,
    private notificacion:NotificacionService,
    private dialog: MatDialog){
    this.listaZapatos() 

  }
  aplicarFiltros() {
    const filtroCategoria = this.filtroForm.get('filtroCategoria').value;
    const filtroNombre = this.filtroForm.get('filtroNombre').value.toLowerCase();
    return this.datos.filter(item =>
      (filtroNombre === '' || item.nombreProducto.toLowerCase().includes(filtroNombre)) &&
      (filtroCategoria.length === 0 || item.categorias.some(cat => filtroCategoria.includes(cat.id)))
    );
  }

  ordenarProductos(productos: any[]): any[] {
    const filtroPrecio = this.filtroForm.get('filtroPrecio').value;
    if (filtroPrecio === 'menor') {
      return productos.slice().sort((a, b) => a.precio - b.precio);
    } else if (filtroPrecio === 'mayor') {
      return productos.slice().sort((a, b) => b.precio - a.precio);
    } else {
      return productos;
    }
  }

  ngOnInit(): void {

    this.filtroForm = this.fb.group({
      filtroCategoria: [''],
      filtroNombre: [''],
      filtroPrecio: [''],
    });
    this.listaCategorias();
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
      })
  }
  listaCategorias() {
    this.categoriasList = null;
    this.gService
      .list('categoria')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.categoriasList = data;
      });
  }

  filterCategorias(idCategoria:number) {
    if (!idCategoria) {
      this.filterDatos = this.datos; 
    } else {
      this.filterDatos = this.datos.filter(producto =>
        producto.categorias.some(categoria => categoria.id === idCategoria)
        );
    }
    console.log('Cate filtrados:', this.filterDatos);
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
    this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
    this.authService.isAuthenticated.subscribe((valor)=>(this.isAutenticated=valor));
    this.id = this.currentUser.usuario.id;
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
