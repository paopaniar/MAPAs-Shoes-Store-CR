import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { CartService } from 'src/app/share/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAutenticated: boolean;
  currentUser: any;
  qtyItems:Number = 0;
  constructor(private cartService: CartService,
    private router: Router,
    private authService: AuthenticationService) {      
        this.qtyItems=this.cartService.quantityItems()
  }

  ngOnInit(): void {
    //valores de prueba
    this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
    this.authService.isAuthenticated.subscribe((valor)=>(this.isAutenticated=valor));
    this.cartService.countItems.subscribe((value)=>{
      this.qtyItems=value
     })
    }
     login(){
      this.router.navigate(['usuario/login']);
    }
    logout(){
      this.authService.logout();
      this.router.navigate(['usuario/login']);
    }
  }

