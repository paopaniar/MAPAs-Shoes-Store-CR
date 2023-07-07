import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mapas-index',
  templateUrl: './mapas-index.component.html',
  styleUrls: ['./mapas-index.component.css']
  
})
export class MapasIndexComponent {
  datos:any;//Guarda la respuesta del API
  destroy$: Subject<boolean>=new Subject<boolean>();

  constructor(private gService:GenericService,
    private router: Router,
    private route: ActivatedRoute){
    this.listaZapatos() 

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
      })
  }
  detalleProducto(id:Number){
    this.router.navigate(['/producto',id],
    {
      relativeTo:this.route
    })
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
