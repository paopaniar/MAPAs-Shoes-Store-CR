import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

export const MAT_MDC_DIALOG_DATA = new InjectionToken<any>('MatMdcDialogData');

@Component({
  selector: 'app-mapas-diag',
  templateUrl: './mapas-diag.component.html',
  styleUrls: ['./mapas-diag.component.css'],
  providers: [{ provide: MAT_DIALOG_DATA, useExisting: MAT_MDC_DIALOG_DATA }]
})
export class MapasDiagComponent implements OnInit {
  datos: any;
  datosDialog: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<MapasDiagComponent>,
    private gService: GenericService
  ) {
    this.datosDialog = data;
  }

  ngOnInit(): void {
    if (this.datosDialog.id) {
      this.obtenerProducto(this.datosDialog.id);
    }
  }

  obtenerProducto(id: any) {
    this.gService
      .get('producto', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
      });
  }

  close() {
    // Dentro de close ()
    // this.form.value
    this.dialogRef.close();
  }
}
