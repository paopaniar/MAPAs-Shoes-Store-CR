import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

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
  idVideojuego: number = 0;
  isCreate: boolean = true;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {
    this.formularioReactive();

  }
  ngOnInit(): void {

    this.activeRouter.params.subscribe((params:Params)=>{
      this.idVideojuego=params['id'];
      if(this.idVideojuego!=undefined){
        this.isCreate=false;
        this.titleForm="Actualizar";

        this.gService.get('producto',this.idVideojuego).pipe(takeUntil(this.destroy$))
         .subscribe((data:any)=>{
          this.videojuegoInfo=data;

          this.videojuegoForm.setValue({
            id:this.videojuegoInfo.id,
            nombre:this.videojuegoInfo.nombre,
            descripcion:this.videojuegoInfo.descripcion,
            precio:this.videojuegoInfo.precio,
            publicar:this.videojuegoInfo.publicar,

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
      publicar: [true, Validators.required],
     
    })
  }
  listaCategorias() {
    this.categoriasList = null;
    this.gService
      .list('categoria')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {

        this.categoriasList = data;
      });
  }


  public errorHandling = (control: string, error: string) => {
    return this.videojuegoForm.controls[control].hasError(error);
  };
  
  crearVideojuego(): void {

    this.submitted = true;

    if(this.videojuegoForm.invalid){
      return;
    }
   

    console.log(this.videojuegoForm.value);

    this.gService.create('producto/crear',this.videojuegoForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {

      this.respVideojuego=data;
      this.router.navigate(['/producto/all'],{
        queryParams: {create:'true'}
      });
    });
  }
 
  actualizarVideojuego() {
    
    this.submitted=true;
    if(this.videojuegoForm.invalid){
      return;
    }
    
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