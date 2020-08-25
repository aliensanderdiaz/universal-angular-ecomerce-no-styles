import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-producto-detalles',
  templateUrl: './producto-detalles.component.html',
  styleUrls: ['./producto-detalles.component.sass']
})
export class ProductoDetallesComponent implements OnInit {

  slugProducto: string;
  idProducto: string;
  producto: any;

  array_detalles: string[] = [];
  array_caracteristicas: string[] = [];

  cargando: boolean = true;

  hermandad: any;
  productoElegido: any;

  constructor(
    public route: ActivatedRoute,
    public apiService: ApiService
  ) { }

  ngOnInit() {
    this.cargarSlug()
  }

  cargarSlug() {
    this.route.params.subscribe(
      (params: Params) => {
        this.slugProducto = params['slug-producto'];
        this.idProducto = this.slugProducto.split('-')[0];
        this.cargarProducto();
      }
    )
  }

  cargarProducto() {
    this.apiService.peticionGet(`productos/${this.idProducto}`)
      .subscribe((data: any) => {
        this.producto = data.producto;
        this.array_detalles = this.producto.detalles ? Object.keys(this.producto.detalles) : [];
        this.array_caracteristicas = this.producto.caracteristicas ? Object.keys(this.producto.caracteristicas) : [];

        console.log({array_detalles: this.array_detalles});
        console.log({array_caracteristicas: this.array_caracteristicas});


        this.hermandad = this.producto.hermandad || null;
        if (this.hermandad) {
          this.productoElegido = this.hermandad.productos.find( producto => producto.producto._id === this.idProducto)
        }
        console.log({ productoElegido: this.productoElegido });
        
        this.cargando = false;
        console.log({ producto: this.producto});
        console.log({ HERMANDAD: this.hermandad })
      })
  }

  cambioOpcion(propiedad, valor) {
    const keys = Object.keys(this.productoElegido.detalles);
    const detalles = {};
    console.log('Antes del foreach..');
    
    keys.forEach(key => detalles[key] = this.productoElegido.detalles[key])
    console.log({ detalles });
    detalles[propiedad] = valor;

    console.log('Despues del foreach..');
    
    this.productoElegido = this.hermandad.productos.find( producto => {
      for (var i = 0; i < keys.length; i++) {
        if ( detalles[keys[i]]  !== producto.detalles[keys[i]]) {
            return false;
        }
    }
    return true;
    }) || this.productoElegido;
    console.log({ productoElegido: this.productoElegido });
    

    this.producto._id = this.productoElegido.producto._id;
    this.producto.nombre = this.productoElegido.producto.nombre;
    this.producto.caracteristicas = this.productoElegido.producto.caracteristicas;
    console.log('http://localhost:3001/images/' + this.producto._id);
    
  }

}
