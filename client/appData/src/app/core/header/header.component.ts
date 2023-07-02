import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isAutenticated: boolean;
  currentUser: any;

  constructor() {
    //afecta donde de se pone la lógica (construtor o OnInit) solo si se tiene que cargar una parte de la pagina
  }

  ngOnInit(): void {
    //valores de prueba
    this.isAutenticated = false;
    let user={
      nombre:"Administrador Mapas",
      email:"admin@gmail.com",

    }
    this.currentUser=user; 
  }
}
