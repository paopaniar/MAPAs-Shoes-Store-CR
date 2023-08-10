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
  usuariosSales: any[] = [];
  respVideojuego: any;
  submitted = false;
  videojuegoForm: FormGroup;
  idProducto: number = 0;
  usuariosList: any;
  isCreate: boolean = true;
  currentUser: any;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
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
            usuario:this.videojuegoInfo.usuarioId,
            cantidadDisponible:this.videojuegoInfo.cantidadDisponible,
            proveedor:this.videojuegoInfo.proveedor,
            myFile: "",
            
          });
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
      descripcion: [null, 
        Validators.required,
        Validators.minLength(3)],
      precio: [null, 
      Validators.required,
      Validators.pattern("^[0-9]*$")],
      cantidadDisponible: [null, Validators.required],
      proveedor:  [null, Validators.required],

      categorias: [null, Validators.required],
      usuario: [null, Validators.required],
      myFile: [null, Validators.required],

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
  
  crearProducto(): void {
    this.submitted = true;
    // this.productoForm.patchValue({ vendedorId: this.idUsuario });

    if (this.videojuegoForm.invalid) {
      return;
    }
  
    const formData = new FormData();
    const formValue = this.videojuegoForm.value;
  
    // Agregar los datos al FormData
    Object.keys(formValue).forEach((key) => {
      const value = formValue[key];
      if (key === 'myFile') {
        const files: File[] = value as File[];
        for (const file of files) {
          formData.append('myFile', file, file.name);
        }
      } else if (key === 'publicar') {
        formData.append(key, JSON.stringify(value));
      } else {
        // Agregar otros valores al FormData
        formData.append(key, value);
      }
    });
  
    let gFormat: any = this.videojuegoForm.get('categorias').value.map(x => ({ ['id']: x }));
    let usuarioId: any = this.videojuegoForm.get('usuario').value;
  
    this.videojuegoForm.patchValue({ generos: gFormat });
    this.videojuegoForm.patchValue({ usuario: usuarioId });
  
    console.log(this.videojuegoForm.value);
    console.log("Precio value:", this.videojuegoForm.get('precio').value);
    console.log("Precio validity:", this.videojuegoForm.get('precio').valid);
  
    this.gService.create('producto', formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.respVideojuego = data;
        this.router.navigate(['/producto/all'], {
         //     queryParams: { create: 'true' }
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
  
  onFileChange(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      const imageArray: File[] = [];
      for (const file of files) {
        imageArray.push(file);
      }
      const maxImages = 5; 
      const imagesToUpload = imageArray.slice(0, maxImages);
      this.videojuegoForm.patchValue({ myFile: imagesToUpload });
    }
  }
  countSelectedImages(): number {
    const myFileControl = this.videojuegoForm.get('myFile');
    return myFileControl.value ? myFileControl.value.length : 0;
  
  }
 
}