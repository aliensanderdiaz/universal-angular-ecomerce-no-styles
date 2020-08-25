import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { FuncionesService } from 'src/app/services/funciones.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.sass']
})
export class ProductoComponent implements OnInit {

  @Input() producto;

  constructor(
    private cartService: CartService,
    public router: Router,
    public funcionesService: FuncionesService
  ) { }

  ngOnInit() {
  }

  addProductToCart() {
    const PRODUCTO = {
      _id: this.producto._id,
      nombre: this.producto.nombre,
      precio: 10000
    }
    PRODUCTO.precio = this.producto.caracteristicas ? this.producto.caracteristicas.precio : 10000;
    this.cartService.addLine(PRODUCTO);
  }

  irAProducto() {
    const slug_producto = this.producto._id + '-' + this.funcionesService.slugify(this.producto.nombre)
    console.log(slug_producto);
    
    this.router.navigate(['/productos', slug_producto])
  }

}
