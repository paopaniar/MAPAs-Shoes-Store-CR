import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mapas-fotografias',
  templateUrl: './mapas-fotografias.component.html',
  styleUrls: ['./mapas-fotografias.component.css']
})
export class MapasFotografiasComponent  implements OnInit{
  datosDialog:any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  datos:any;
  submitted = false;
  currentUser: any;
  fotografias: any;
  selectedFiles: File[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef:MatDialogRef<MapasFotografiasComponent>,
    private gService:GenericService,
    private router: Router,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private http: HttpClient,
    private formBuilder: FormBuilder, 
    private snackBar: MatSnackBar
  ) { 
    this.datosDialog=data;
  }

  obtenerProducto(id:any){
    console.log(id);
   this.gService
  .get('producto', id)
  .pipe(takeUntil(this.destroy$))
  .subscribe((data: any) => {
    this.datos = data; 
    console.log(this.datos);
    this.fotografias = this.datos.fotografias;
  });

  }

  onFilesSelected(fileInput: HTMLInputElement): void {
    const selectedFiles = fileInput.files;
    if (selectedFiles) {
      this.selectedFiles = Array.from(selectedFiles);
    }
  }

  onImageSelected(event: any): void {
    const selectedImage = event.target.files[0]; // Get the selected file
    this.uploadImage(selectedImage); // Call the uploadImage function with the selected image
  }

  async uploadImage(selectedImage: File): Promise<void> {
    if (!selectedImage) {
      alert('Please select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage); // 'image' should match the field name in your backend

    const idproducto = 4; // Replace with the actual product ID
    try {
      const response = await this.http.post<any>(`/fotografias/crear/${idproducto}`, formData).toPromise();
      console.log('Image uploaded:', response);
    } catch (error) {
      console.error('Upload error:', error);
      alert('An error occurred while uploading the image.');
    }
  }
  
  createFotografia(): void {
    this.submitted = true;
    const productId = this.datosDialog.id;
  
    if (this.selectedFiles.length > 0) {
      const formData = new FormData();
  
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('imagen', this.selectedFiles[i]);
      }
  
      this.gService.create(`http://localhost:3000/fotografias/crear/${productId}`, formData)
      .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data: any) => {
            this.router.navigate(['/producto'], {
              queryParams: { create: 'true' }
            });
            this.showSuccessMessage('Se asignaron las imágenes exitosamente!');
          },
          (error) => {
            console.error('Error:', error);
            // Handle error appropriately (e.g., show error message to user)
          }
        
        );
    } else {
      console.error('No images selected.');
    }
    this.close();
  }
  

  ngOnInit(): void {
    if (this.datosDialog && this.datosDialog.id) {
      this.obtenerProducto(this.datosDialog.id);
    }
  }
  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000, 
      panelClass: 'success-snackbar' 
    });
  }
  close(){
    this.dialogRef.close();
  }

}