import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ConstantesService } from 'src/app/services/constantes.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-productos-por-subcategoria',
  templateUrl: './productos-por-subcategoria.component.html',
  styleUrls: ['./productos-por-subcategoria.component.sass']
})
export class ProductosPorSubcategoriaComponent implements OnInit {

  subcategoria: any;

  cargando: boolean = true;
  cargandoProductos: boolean = true;

  slugCategoriaPrincipal: string;
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
    private router: Router,
    private constantesService: ConstantesService,
    private funcionesService: FuncionesService,
    private apiService: ApiService
  ) { }

  ngOnInit() {

    this.cargando = true;
    this.cargandoProductos = true;

    this.route.params.subscribe(
      (params: Params) => {
        this.paginaActual = 1;
        this.slugCategoriaPrincipal = params['slug-categoria-principal'];
        this.slugCategoria = params['slug-categoria'];
        this.slugSubcategoria = params['slug-subcategoria'];
        this.verificarCategorias();
        
      }
    )

  }

  verificarCategorias() {
    const categoriaPrincipal = this.constantesService.CATEGORIAS.find(
      categoria => this.funcionesService.slugify(categoria.nombre) === this.slugCategoriaPrincipal
    );

    if (!categoriaPrincipal) {
      this.router.navigate(['/page-not-found']);
      return;
    }

    const CATEGORIA = categoriaPrincipal.categorias.find(
      categoria => this.funcionesService.slugify(categoria.nombre) === this.slugCategoria
    );

    if (!CATEGORIA) {
      this.router.navigate(['/page-not-found']);
      return;
    }

    const SUBCATEGORIA = CATEGORIA.categorias.find(
      categoria => this.funcionesService.slugify(categoria.nombre) === this.slugSubcategoria
    );

    if (!SUBCATEGORIA) {
      this.router.navigate(['/page-not-found']);
      return;
    }

    this.itemsBreadcrumd = [
      {
        nombre: categoriaPrincipal.nombre,
        url: `/categorias/${ this.slugCategoriaPrincipal }`
      },
      {
        nombre: CATEGORIA.nombre,
        url: `/categorias/${ this.slugCategoriaPrincipal }/${ this.slugCategoria }`
      },
      {
        nombre: SUBCATEGORIA.nombre,
        url: `/categorias/${ this.slugCategoriaPrincipal }/${ this.slugCategoria }/${ this.slugSubcategoria }`
      }
    ]
    
    console.log({itemsBreadcrumd: this.itemsBreadcrumd});
    
    this.obtenerCategoria();

    this.cargando = false;
  }

  obtenerCategoria() {
    // Tengo que traer las hijas
    this.apiService.peticionGet(`categorias/slug/${this.slugSubcategoria}`)
      .subscribe(
        (data: any) => {
          console.log({data});
          
          this.subcategoria = data.categoria[0];
          if (!this.subcategoria) {
            this.router.navigate(['/', 'page-not-found'])
            return;
          }
          this.obtenerProductos();
        }
      )
  }

  obtenerProductos() {
    this.apiService.peticionGet(`productos/subcategoria/${this.subcategoria._id}?ordenPor=${this.ordenPor}`)
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

    this.apiService.peticionGet(`productos/subcategoria/${this.subcategoria._id}?pagina=${this.paginaActual}&ordenPor=${this.ordenPor}`)
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

    this.apiService.peticionGet(`productos/subcategoria/${this.subcategoria._id}?pagina=${this.paginaActual}&ordenPor=${this.ordenPor}`)
      .subscribe(
        (data: any) => {
          this.productos = data.productos;
          this.cargandoProductos = false;
        }
      )
  }

}
