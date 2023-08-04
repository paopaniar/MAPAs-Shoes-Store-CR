import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar


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
  isCreate: boolean = true;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private snackBar: MatSnackBar // Inject MatSnackBar

  ) {
    this.formularioReactive();
    this.listaCategorias();
  }
  ngOnInit(): void {

    this.activeRouter.params.subscribe((params:Params)=>{
      this.idProducto=params['id'];
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
         
            
          })
         });
      }

    });
  }

  formularioReactive() {
 
    this.videojuegoForm=this.fb.group({
      id:[null,null],
      nombreProducto:[null, Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      descripcion: [null, Validators.required],
      precio: [null, Validators.required],
      cantidadDisponible: [null, Validators.required],
      proveedor:  [null, Validators.required],

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
  
  crearProducto(): void {

    this.submitted = true;

    if(this.videojuegoForm.invalid){
      return;
    }
    let gFormat:any=this.videojuegoForm.get('categorias').value.map(x=>({['id']: x}))

    this.videojuegoForm.patchValue({generos: gFormat});

    console.log(this.videojuegoForm.value);

    this.gService.create('producto/crear',this.videojuegoForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {

      this.respVideojuego=data;
      this.router.navigate(['/producto/all'],{
        queryParams: {create:'true'}
      });

      this.showSuccessMessage('Producto creado exitosamente!');
    });
  }
  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Set the duration for how long the snackbar should be visible
      panelClass: 'success-snackbar' // Optionally apply custom CSS class for styling
    });
  }
  actualizarProducto() {
    
    this.submitted=true;
    if(this.videojuegoForm.invalid){
      return;
    }
    let gFormat:any=this.videojuegoForm.get('categorias').value.map(x=>({['id']: x }));
    this.videojuegoForm.patchValue({ categorias:gFormat});
    let nombreProducto = this.videojuegoForm.get('nombreProducto').value;
    this.videojuegoForm.patchValue({ nombreProducto: nombreProducto });
    
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