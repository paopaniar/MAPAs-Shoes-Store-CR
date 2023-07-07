import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MapasDiagComponent } from '../mapas-diag/mapas-diag.component';

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
    private route: ActivatedRoute,
    private dialog: MatDialog){
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
    console.log(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(MapasDiagComponent, dialogConfig);
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
