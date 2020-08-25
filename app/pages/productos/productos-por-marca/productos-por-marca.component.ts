import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConstantesService } from 'src/app/services/constantes.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-productos-por-marca',
  templateUrl: './productos-por-marca.component.html',
  styleUrls: ['./productos-por-marca.component.sass']
})
export class ProductosPorMarcaComponent implements OnInit {

  slugMarca: string;
  cargando: boolean = true;
  cargandoMarca: boolean = true;
  marca: any;

  cargandoProductos: boolean = true;

  productos: any[] = [];

  totalProductos: number;
  productosPorPagina: number = 12;
  totalPaginas: number;
  paginaActual: number = 1;

  ordenPor = 'precioMenor';

  constructor(
    private route: ActivatedRoute,
    private constantesService: ConstantesService,
    public funcionesService: FuncionesService,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.cargando = true;
    this.route.params.subscribe(
      (params: Params) => {
        this.slugMarca = params['slug-marca'];
        this.verificarMarca();
      }
    )
  }

  verificarMarca() {
    const marca = this.constantesService.MARCAS.find(
      marca => this.funcionesService.slugify(marca.nombre) === this.slugMarca
    );

    if (!marca) {
      this.router.navigate(['/page-not-found']);
      return;
    }
    this.obtenerMarca();
    this.cargando = false;
  }

  obtenerMarca() {
    this.apiService.peticionGet(`marcas/slug/${this.slugMarca}`)
      .subscribe(
        (data: any) => {
          this.marca = data.marca[0];
          console.log({marca: this.marca});
          
          if (!this.marca) {
            this.router.navigate(['/', 'page-not-found'])
          }
          this.cargandoMarca = false;
          this.obtenerProductos();
        }
      )
  }

  obtenerProductos() {
    this.apiService.peticionGet(`productos/marca/${this.marca._id}?ordenPor=${this.ordenPor}`)
      .subscribe(
        (data: any) => {
          this.productos = data.productos;
          this.totalProductos = data.total;
          this.totalPaginas = this.totalProductos % this.productosPorPagina === 0 ? 
                              this.totalProductos / this.productosPorPagina : 
                              Math.trunc( (this.totalProductos / this.productosPorPagina) + 1 )
          this.cargandoProductos = false;
        }
      )
  }

  cambiarPagina(pagina) {
    this.cargandoProductos = true;
    this.paginaActual = pagina;

    this.apiService.peticionGet(`productos/marca/${this.marca._id}?pagina=${this.paginaActual}&ordenPor=${this.ordenPor}`)
      .subscribe(
        (data: any) => {
          this.productos = data.productos;
          this.cargandoProductos = false;
        }
      )
  }

  irACategoria(categoria) {
    this.router.navigate(['/marcas', this.slugMarca, this.funcionesService.slugify(categoria)]);
  }

  cambiarOrden(e) {
    console.log({e});
    
    this.ordenPor = e;
    this.cargandoProductos = true;
    this.paginaActual = 1;

    this.apiService.peticionGet(`productos/marca/${this.marca._id}?pagina=${this.paginaActual}&ordenPor=${this.ordenPor}`)
      .subscribe(
        (data: any) => {
          this.productos = data.productos;
          this.cargandoProductos = false;
        }
      )
  }

}
