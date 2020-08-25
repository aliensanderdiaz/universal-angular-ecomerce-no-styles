import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConstantesService } from 'src/app/services/constantes.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-productos-por-categoria',
  templateUrl: './productos-por-categoria.component.html',
  styleUrls: ['./productos-por-categoria.component.sass']
})
export class ProductosPorCategoriaComponent implements OnInit {

  categoria: any;
  subcategorias: any[] = [];

  slugCategoriaPrincipal: string;
  slugCategoria: string;

  cargando: boolean = true;
  cargandoProductos: boolean = true;

  productos: any[] = [];

  totalProductos: number;
  productosPorPagina: number = 12;
  totalPaginas: number;
  paginaActual: number = 1;

  itemsBreadcrumd: any[] = [];

  ordenPor = 'precioMenor';

  filtros: any[] = [];
  filtrosAplicados: any[] = [];



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
        this.filtrosAplicados = [];
        this.slugCategoriaPrincipal = params['slug-categoria-principal'];
        this.slugCategoria = params['slug-categoria'];
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

    this.subcategorias = CATEGORIA.categorias;
    this.itemsBreadcrumd = [
      {
        nombre: categoriaPrincipal.nombre,
        url: `/categorias/${this.slugCategoriaPrincipal}`
      },
      {
        nombre: CATEGORIA.nombre,
        url: `/categorias/${this.slugCategoriaPrincipal}/${this.slugCategoria}`
      }
    ]

    this.obtenerCategoria();

    this.cargando = false;
  }

  obtenerCategoria() {
    // Tengo que traer las hijas
    this.apiService.peticionGet(`categorias/slug/${this.slugCategoria}`)
      .subscribe(
        (data: any) => {
          console.log({ data });

          this.categoria = data.categoria[0];
          if (this.categoria) {
            this.filtros = this.categoria.detalles || [];
          } else {
            this.filtros = [];
          }
          console.log({ DETALLES: this.filtros })
          if (!this.categoria) {
            this.router.navigate(['/', 'page-not-found'])
            return;
          }
          this.obtenerProductos();
        }
      )
  }

  obtenerProductos() {
    this.apiService.peticionGet(`productos/categoria/${this.categoria._id}?ordenPor=${this.ordenPor}`)
      .subscribe(
        (data: any) => {
          this.productos = data.productos;
          console.log({ PRODUCTOS: this.productos });

          this.totalProductos = data.total;
          this.totalPaginas = this.totalProductos % this.productosPorPagina === 0 ?
            this.totalProductos / this.productosPorPagina :
            Math.trunc((this.totalProductos / this.productosPorPagina) + 1)
          this.cargandoProductos = false;
        }
      )
  }

  cambiarPagina(pagina) {
    this.cargandoProductos = true;
    this.paginaActual = pagina;

    this.apiService.peticionGet(`productos/categoria/${this.categoria._id}?pagina=${this.paginaActual}&ordenPor=${this.ordenPor}`)
      .subscribe(
        (data: any) => {
          this.productos = data.productos;
          this.cargandoProductos = false;
        }
      )
  }

  irASubcategoria(subcategoria) {
    this.router.navigate(['/categorias', this.slugCategoriaPrincipal, this.slugCategoria, this.funcionesService.slugify(subcategoria)])
  }


  cambiarOrden(e) {
    console.log({ e });

    this.ordenPor = e;
    this.cargandoProductos = true;
    this.paginaActual = 1;

    this.apiService.peticionGet(`productos/categoria/${this.categoria._id}?pagina=${this.paginaActual}&ordenPor=${this.ordenPor}`)
      .subscribe(
        (data: any) => {
          this.productos = data.productos;
          this.cargandoProductos = false;
        }
      )
  }

  addOption(detalle_0, detalle_1, opcion) {
    const indice = this.filtrosAplicados.findIndex(filtro => filtro.detalle_1 === detalle_1);
    if (indice < 0) {
      this.filtrosAplicados.push({
        detalle_0, detalle_1, opciones: [opcion]
      })
    } else {
      if (this.filtrosAplicados[indice].opciones.includes(opcion)) {
        return;
      }
      this.filtrosAplicados[indice].opciones.push(opcion);
    }
    console.log({ filtrosAplicados: this.filtrosAplicados });

    this.cargarFiltros();

  }

  deleteOption(detalle_1, opcion) {
    const indice = this.filtrosAplicados.findIndex(filtro => filtro.detalle_1 === detalle_1);

    if (this.filtrosAplicados[indice].opciones.length === 1) {
      this.filtrosAplicados.splice(indice, 1)
    } else {
      const indice_option = this.filtrosAplicados[indice].opciones.findIndex(opc => opc === opcion)
  
      this.filtrosAplicados[indice].opciones.splice(indice_option, 1);
    }


    console.log({ filtrosAplicados: this.filtrosAplicados });

    this.cargarFiltros();

  }

  cargarFiltros() {
    let url = '';

    this.filtrosAplicados.forEach(filtro => url += `&DETALLES${filtro.detalle_1}=${filtro.opciones.join(',')}`);

    this.cargandoProductos = true;
    this.paginaActual = 1;

    this.apiService.peticionGet(`productos/categoria/${this.categoria._id}?pagina=${this.paginaActual}&ordenPor=${this.ordenPor}${url}`)
      .subscribe(
        (data: any) => {
          this.productos = data.productos;
          this.cargandoProductos = false;

          this.totalProductos = data.total;
          this.totalPaginas = this.totalProductos % this.productosPorPagina === 0 ?
            this.totalProductos / this.productosPorPagina :
            Math.trunc((this.totalProductos / this.productosPorPagina) + 1)
        }
      )
  }
}
