import { AfterViewInit, Component, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from 'src/app/share/authentication.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-dashboard-sales',
  templateUrl: './dashboard-sales.component.html',
  styleUrls: ['./dashboard-sales.component.css']
})
export class DashboardSalesComponent {
  canvas: any;
  //Contexto del Canvas
  ctx: any;
  //Elemento html del Canvas
  @ViewChild('graficoCanvas') graficoCanvas!: { nativeElement: any };
  //Establecer gráfico
  grafico: any;
  //Datos para mostrar en el gráfico
  datos: any;
  datos1: any;
  datos2: any;
  datos3: any;
  //Lista de meses para filtrar el gráfico
  mesList: any;
  productoMasVendido: any;
  formattedDate: any;
  currentUser: any;
  isAutenticated: boolean;
  productoVendido: any;
  //Mes actual
  filtro = new Date().getMonth();
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private gService: GenericService, private datePipe: DatePipe,
    private authService: AuthenticationService,) {}
  ngAfterViewInit(): void {
    this.ngOnInit();
  }

  productoVendedor(){
    this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
    this.authService.isAuthenticated.subscribe((valor)=>(this.isAutenticated=valor));
    let usuarioId= this.currentUser.usuario.id;
    this.gService
    .get('orden/masVendido',usuarioId)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      this.productoVendido = data[0];
      if(this.productoMasVendido== null){
        this.productoMasVendido="No tiene productos vendidos";
      }else{
        this.productoMasVendido = this.productoVendido.nombreProducto;
      }
     
    })
  }

  //Configurar y crear gráfico
  graficoBrowser(): void {
    this.canvas = this.graficoCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    //Si existe destruir el Canvas para mostrar el grafico
    if (this.grafico) {
      this.grafico.destroy();
    }
    this.grafico = new Chart(this.ctx, {
      type: 'pie',
      data: {
        //Etiquetas debe ser un array
        labels: this.datos.map((x) => x.nombre),
        datasets: [
          {
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)',
            ],
            //Datos del grafico, debe ser un array
            data: this.datos.map((x) => x.suma),
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
      },
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }

   ngOnInit(): void {
    // Obtener el ID del vendedor logueado (reemplaza con tu lógica de obtención de ID)
    this.productoVendedor();
  } 
  
}
