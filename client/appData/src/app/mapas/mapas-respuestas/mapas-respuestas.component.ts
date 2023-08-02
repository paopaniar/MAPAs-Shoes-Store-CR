import { Component } from '@angular/core';


@Component({
  selector: 'app-mapas-respuestas',
  templateUrl: './mapas-respuestas.component.html',
  styleUrls: ['./mapas-respuestas.component.css']
})
export class MapasRespuestasComponent {
  datos:any;
}

//  ListaPreguntas(id:Number){
//   console.log(id);
//   const dialogConfig = new MatDialogConfig();
//   dialogConfig.disableClose = false;
//   dialogConfig.data = {
//     id: id,
//   };
//   this.dialog.open(MapasDiagComponent, dialogConfig);
// }
