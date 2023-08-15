import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';


@Component({
  selector: 'app-mapas-create',
  templateUrl: './mapas-create.component.html',
  styleUrls: ['./mapas-create.component.css']
})
export class MapasCreateComponent implements OnInit {
  
  destroy$: Subject<boolean> = new Subject<boolean>();
  //Titulo
  titleForm: string = 'Crear';
  categoriasList: any;
  videojuegoInfo: any;
  respVideojuego: any;
  submitted = false;
  videojuegoForm: FormGroup;
  idProducto: number = 0;
  usuariosList: any;
  idUsuario: number;
  isAutenticated: boolean;
  isCreate: boolean = true;
  currentUser: any;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private noti: NotificacionService,
    private authService: AuthenticationService,
    private activeRouter: ActivatedRoute,
    private snackBar: MatSnackBar // Inject MatSnackBar

  ) {
    this.formularioReactive();
    this.listaCategorias();
    this.listaUsuariosSales();
  }
  ngOnInit(): void {

    this.activeRouter.params.subscribe((params:Params)=>{
      this.idProducto=params['id'];
      // this.idUsuarioSales=params['id'];
      if(this.idProducto!=undefined){
        this.isCreate=false;
        this.titleForm="Actualizar";

        this.gService
        .get('producto',this.idProducto)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data:any)=>{
          this.videojuegoInfo=data;
          this.videojuegoForm.setValue({
            id:this.videojuegoInfo.id,
            nombreProducto:this.videojuegoInfo.nombreProducto,
            descripcion:this.videojuegoInfo.descripcion,
            precio:this.videojuegoInfo.precio,
            categorias:this.videojuegoInfo.categorias.map(({id}) => id),
            cantidadDisponible:this.videojuegoInfo.cantidadDisponible,
            proveedor:this.videojuegoInfo.proveedor,
            usuario: this.videojuegoInfo.usuarioId,
           });
         });
      }

    })
   }

  
  formularioReactive() {
 
    this.videojuegoForm=this.fb.group({
      id:[null,null],
      nombreProducto:[null, Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      descripcion: [null, 
        Validators.required,
        Validators.minLength(3)],
      precio: [null, 
      Validators.required,
      Validators.pattern("^[0-9]*$")],
      cantidadDisponible: [null, Validators.required],
      proveedor:  [null, Validators.required],
      categorias: [null, Validators.required],
      usuario: [null],
    })
  }

  listaUsuariosSales() {
    this.gService
    .list('usuario') // Cambiar 'usuario' por el endpoint correcto para obtener la lista de usuarios
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      // Filtrar la lista de usuarios por rol SALES
      this.usuariosList = data.filter((usuario: any) => usuario.rol === 'SALES');
      });
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

  public errorHandling = (control: string, error: string) => {
    return this.videojuegoForm.controls[control].hasError(error);
  };
  

  crearVideojuego(): void {
    this.submitted = true;
    
    if (this.videojuegoForm.invalid) {
      return;
    }
  
    let gFormat: any = this.videojuegoForm.get('categorias').value.map(x => ({ ['id']: x }));
    // let usuarioId: any = this.videojuegoForm.get('usuario').value;
    this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
    this.authService.isAuthenticated.subscribe((valor)=>(this.isAutenticated=valor));
    let usuarioId= this.currentUser.user.id;

    this.videojuegoForm.patchValue({ generos: gFormat });
    // this.videojuegoForm.patchValue({ usuario: usuarioId}); 
    this.videojuegoForm.patchValue({ usuario: usuarioId}); 

    console.log(this.videojuegoForm.value);
    
    this.gService.create('producto/crear', this.videojuegoForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.noti.mensaje('Producto', 'Producto Creado!', TipoMessage.success)
        this.respVideojuego = data;
        this.router.navigate(['orden/vendedor'], {
          queryParams: { create: 'true' }
        });
      });
  }

  actualizarProducto() {
    
    this.submitted=true;
    if(this.videojuegoForm.invalid){
      return;
    }
    let uFormat:any=this.videojuegoForm.get('usuario').value;
    let gFormat:any=this.videojuegoForm.get('categorias').value.map(x=>({['id']: x }));
    this.videojuegoForm.patchValue({ categorias:gFormat});
    let nombreProducto = this.videojuegoForm.get('nombreProducto').value;
    this.videojuegoForm.patchValue({ nombreProducto: nombreProducto });
    this.videojuegoForm.patchValue({usuario: uFormat});

    console.log(this.videojuegoForm.value);
    this.gService.update('producto',this.videojuegoForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      this.respVideojuego=data;
      this.router.navigate(['/producto/all'],{
        queryParams: {update:'true'}
      });
    });
  }
  onReset() {
    this.submitted = false;
    this.videojuegoForm.reset();
  }
  onBack() {
    this.router.navigate(['/producto/all']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  
  
 
}