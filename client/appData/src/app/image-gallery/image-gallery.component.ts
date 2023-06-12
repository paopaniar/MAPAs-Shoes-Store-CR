import { Component } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent {
  images = [
    { url: 'assets/images/womenSandals.jpg', alt: 'Image 1' },
    { url: 'assets/images/boySandals.jpg', alt: 'Image 2' },
    { url: 'assets/images/manSandals.jpg', alt: 'Image 3' },
    // Add more images as needed
  ];
}
