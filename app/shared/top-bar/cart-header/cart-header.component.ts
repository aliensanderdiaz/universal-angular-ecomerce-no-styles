import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-header',
  templateUrl: './cart-header.component.html',
  styleUrls: ['./cart-header.component.sass']
})
export class CartHeaderComponent implements OnInit {

  items: number = 0;
  total: number = 0;

  constructor(
    public cartService: CartService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  irACarrito() {
    this.router.navigate(['/cart'])
  }

}
