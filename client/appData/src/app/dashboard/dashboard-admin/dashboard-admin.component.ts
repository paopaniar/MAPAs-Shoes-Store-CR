import { AfterViewInit, Component, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { DatePipe } from '@angular/common';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css'],
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
  datos1: any;
  datos2: any;
  datos3: any;
  //Lista de meses para filtrar el gráfico
  mesList: any;
  formattedDate: any;
  mes: any;
  numeroMes: any;
  //Mes actual
  filtro = new Date().getMonth();
  destroy$: Subject<boolean> = new Subject<boolean>();
  cantOrdenes: any;
  cantProductos: any;
  constructor(private gService: GenericService, private datePipe: DatePipe) {
    const fechaActual = new Date();
    const opcionDeFormato: Intl.DateTimeFormatOptions = { month: 'long' };
    this.mes = fechaActual.toLocaleDateString('es', opcionDeFormato);
    this.numeroMes = parseInt(
      fechaActual.toLocaleDateString('es', { month: 'numeric' })
    );
  }

  ngAfterViewInit(): void {
    this.ngOnInit();
  }

  obtenerComprasDiaActual() {
    this.gService
      .list('orden/cantidades')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.cantOrdenes = data.length;
      });
  }
 

  inicioGrafico1() {
    this.gService
      .get('orden/productoTop', this.numeroMes)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        this.graficoBrowser();
      });
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
    this.obtenerComprasDiaActual();
    this.inicioGrafico1();
  }
  openPDF() {
    //htmlData: id del elemento HTML
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      //Configuración del ancho y alto del Canvas de la imagen
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      //devuelve un data URI,el cual contiene una representación
      // de la imagen en el formato especificado por el parámetro type
      const FILEURI = canvas.toDataURL('image/png');
      //Orientación, unidad, formato
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      //Agregar imagen al PDF
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('reporte.pdf');
    });
  }
}
