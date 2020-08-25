import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ConstantesService } from 'src/app/services/constantes.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-productos-por-marca-subcategoria',
  templateUrl: './productos-por-marca-subcategoria.component.html',
  styleUrls: ['./productos-por-marca-subcategoria.component.sass']
})
export class ProductosPorMarcaSubcategoriaComponent implements OnInit {

  marca: any;
  subcategoria: any;
  subcategorias: any[] = [];

  cargando: boolean = true;
  cargandoProductos: boolean = true;

  slugMarca: string;
  slugCategoria: string;
  slugSubcategoria: string;
  

  productos: any[] = [];

  totalProductos: number;
  productosPorPagina: number = 12;
  totalPaginas: number;
  paginaActual: number = 1;

  itemsBreadcrumd: any[] = [];

  ordenPor = 'precioMenor';

  constructor(
    private route: ActivatedRoute,
    private constantesService: ConstantesService,
    private funcionesService: FuncionesService,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.cargando = true;
    this.cargandoProductos = true;

    this.route.params.subscribe(
      (params: Params) => {
        this.paginaActual = 1;
        this.slugMarca = params['slug-marca'];
        this.slugCategoria = params['slug-categoria'];
        this.slugSubcategoria = params['slug-subcategoria'];

        console.log({marca: this.slugMarca, categoria: this.slugCategoria});
        
        this.verificarMarcaCategoria();
        
      }
    )
  }

  verificarMarcaCategoria() {
    const marca = this.constantesService.MARCAS.find(
      marca => this.funcionesService.slugify(marca.nombre) === this.slugMarca
    );

    if (!marca) {
      this.router.navigate(['/page-not-found']);
      return;
    }

    const CATEGORIA = marca.categorias.find(
      categoria => this.funcionesService.slugify(categoria) === this.slugCategoria
    );

    if (!CATEGORIA) {
      this.router.navigate(['/page-not-found']);
      return;
    }

    this.constantesService.CATEGORIAS.forEach(categoriaPrincipal => {
      categoriaPrincipal.categorias.forEach(categoria => {
        if (this.funcionesService.slugify(categoria.nombre) === this.slugCategoria) {
          this.subcategorias = categoria.categorias;
          return;
        }
      })
    });

    const SUBCATEGORIA = this.subcategorias.find(subcategoria => this.funcionesService.slugify(subcategoria.nombre) === this.slugSubcategoria)

    if (!SUBCATEGORIA) {
      this.router.navigate(['/page-not-found']);
      return;
    }

    this.itemsBreadcrumd = [
      {
        nombre: marca.nombre,
        url: `/marcas/${ this.slugMarca }`
      },
      {
        nombre: CATEGORIA,
        url: `/marcas/${ this.slugMarca }/${ this.slugCategoria }`
      },
      {
        nombre: SUBCATEGORIA.nombre,
        url: `/marcas/${ this.slugMarca }/${ this.slugCategoria }/${ this.slugSubcategoria }`
      }
    ]
    

    this.cargando = false;

    this.obtenerMarca();
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
          this.obtenerCategoria();
        }
      )
  }

  obtenerCategoria() {
    this.apiService.peticionGet(`categorias/slug/${this.slugSubcategoria}`)
      .subscribe(
        (data: any) => {
          this.subcategoria = data.categoria[0];
          if (!this.subcategoria) {
            this.router.navigate(['/', 'page-not-found'])
          }
          this.obtenerProductos();
        }
      )
  }

  obtenerProductos() {
    this.apiService.peticionGet(`productos/marca-subcategoria/${this.marca._id}/${this.subcategoria._id}?ordenPor=${this.ordenPor}`)
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

    this.apiService.peticionGet(`productos/marca-subcategoria/${this.marca._id}/${this.subcategoria._id}?pagina=${this.paginaActual}&ordenPor=${this.ordenPor}`)
      .subscribe(
        (data: any) => {
          this.productos = data.productos;
          this.cargandoProductos = false;
        }
      )
  }

  cambiarOrden(e) {
    console.log({e});
    
    this.ordenPor = e;
    this.cargandoProductos = true;
    this.paginaActual = 1;

    this.apiService.peticionGet(`productos/marca-subcategoria/${this.marca._id}/${this.subcategoria._id}?pagina=${this.paginaActual}&ordenPor=${this.ordenPor}`)
      .subscribe(
        (data: any) => {
          this.productos = data.productos;
          this.cargandoProductos = false;
        }
      )
  }

}
