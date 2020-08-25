import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.sass']
})
export class PaginacionComponent implements OnInit {

  @Input() totalProductos: number;
  @Input() paginaActual: number;
  @Input() productosPorPagina: number;
  @Input() totalPaginas: number;

  @Output() cambioPagina: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log({
      totalProductos: this.totalProductos,
      paginaActual: this.paginaActual,
      productosPorPagina: this.productosPorPagina,
      totalPaginas: this.totalPaginas,
    });

  }

  cambiarPagina(cantidad, pagina) {
    if (cantidad) {
      this.paginaActual += cantidad;
    }

    if (pagina) {
      this.paginaActual = pagina;
    }

    this.cambioPagina.emit(this.paginaActual);

  }

}
