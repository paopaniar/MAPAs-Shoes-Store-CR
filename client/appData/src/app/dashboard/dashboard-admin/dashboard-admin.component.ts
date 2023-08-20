import { AfterViewInit, Component, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent {
  canvas: any;
  //Contexto del Canvas
  ctx: any;
  //Elemento html del Canvas
  @ViewChild('graficoCanvas') graficoCanvas!: { nativeElement: any };
  //Establecer gráfico
  grafico: any;
  //Datos para mostrar en el gráfico
  datos: any;
  //Lista de meses para filtrar el gráfico
  mesList:any;
 formattedDate: any;
  //Mes actual
  filtro= new Date().getMonth();
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private gService: GenericService,
    private datePipe: DatePipe
  ) {
 
  }
 
  ngAfterViewInit(): void {
    this.obtenerComprasDiaActual();
  }

   obtenerComprasDiaActual() {
    const fechaActual = new Date();
   this.formattedDate = this.datePipe.transform(fechaActual, 'yyyy-MM-dd');
    this.gService
      .get('orden/producto', this.formattedDate)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        this.graficoBrowser();
      });
  }
   //Configurar y crear gráfico
   graficoBrowser(): void {
    this.canvas=this.graficoCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    //Si existe destruir el Canvas para mostrar el grafico
    if(this.grafico){
     this.grafico.destroy();
    }
    this.grafico= new Chart(this.ctx,{
     type:'pie',
     data:{
       //Etiquetas debe ser un array
       labels: this.datos.map(x => x.nombre),
       datasets:[
         {
           backgroundColor: [
             'rgba(255, 99, 132, 0.2)',
             'rgba(255, 159, 64, 0.2)',
             'rgba(255, 205, 86, 0.2)',
             'rgba(75, 192, 192, 0.2)',
             'rgba(54, 162, 235, 0.2)',
             'rgba(153, 102, 255, 0.2)',
             'rgba(201, 203, 207, 0.2)'
         ],
         //Datos del grafico, debe ser un array
         data: this.datos.map(x => x.suma)
         },
       ]
     },
         options:{
           responsive:false,
           maintainAspectRatio: false,
         },
       
    });
   }
   ngOnDestroy() {
     this.destroy$.next(true);
     // Desinscribirse
     this.destroy$.unsubscribe();
   }
}
