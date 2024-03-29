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
  }
  ngOnInit(): void {

    this.activeRouter.params.subscribe((params: Params) => {
      this.idProducto = params['id'];
      if (this.idProducto != undefined) {
        this.isCreate = false;
        this.titleForm = "Actualizar";

        this.gService.get('producto', this.idProducto).pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
          this.videojuegoInfo=data;
          console.log('trae los datos en el actualizar?',data);

          this.videojuegoForm.setValue({
            id: this.videojuegoInfo.id,
            nombreProducto: this.videojuegoInfo.nombreProducto,
            descripcion: this.videojuegoInfo.descripcion,
            precio: this.videojuegoInfo.precio,
            categorias: this.videojuegoInfo.categorias.map(({ id }) => id),
            cantidadDisponible: this.videojuegoInfo.cantidadDisponible,
            proveedor: this.videojuegoInfo.proveedor,
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
      descripcion: [null, Validators.compose([
        Validators.required,
        Validators.minLength(3)])],
        precio: [null, Validators.compose([
          Validators.required,
          Validators.pattern(/^\d+(\.\d{1,2})?$/)
        ])],
      cantidadDisponible: [null, Validators.compose([
        Validators.required,
        Validators.pattern(/^[1-9]\d*$/)
      ])],
      proveedor:  [null, Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      categorias: [null, Validators.required],
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

  public errorHandling = (control: string, error: string) => {
    return this.videojuegoForm.controls[control].hasError(error);
  };
  

  crearVideojuego(): void {
    this.submitted = true;
    
    if (this.videojuegoForm.invalid) {
      return;
    }
  
    let gFormat: any = this.videojuegoForm.get('categorias').value.map(x => ({ ['id']: x }));
    this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
    this.authService.isAuthenticated.subscribe((valor)=>(this.isAutenticated=valor));
    let usuarioId= this.currentUser.usuario.id;
    this.videojuegoForm.patchValue({ generos: gFormat });
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

    this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
    this.authService.isAuthenticated.subscribe((valor)=>(this.isAutenticated=valor));
    let usuarioId= this.currentUser.usuario.id;


    let nombreProducto = this.videojuegoForm.get('nombreProducto').value;
    let gFormat:any=this.videojuegoForm.get('categorias').value.map(x=>({['id']: x }));

    this.videojuegoForm.patchValue({ nombreProducto: nombreProducto });

    this.videojuegoForm.patchValue({ usuario: usuarioId}); 
    this.videojuegoForm.patchValue({ categorias:gFormat});
   

    console.log(this.videojuegoForm.value);
    
    this.gService.update('producto',this.videojuegoForm.value)
    .pipe(takeUntil(this.destroy$)) 
    .subscribe((data: any) => {
      this.noti.mensaje('Exito', 'Producto modificado!', TipoMessage.success)
      this.respVideojuego=data;
      this.router.navigate(['/producto/vendedor'],{
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