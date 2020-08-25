import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.sass']
})
export class SearchHeaderComponent implements OnInit {

  terminoBusqueda: string;

  categoria: string;

  categorias: string[] = [
    'Ventiladores',
    'Estufas',
    'Licuadoras'
  ];

  busquedasSugeridas: any[] = [
    {
      termino: 'Ventiladores',
      url: ['/', 'categorias', 'ventiladores']
    },
    {
      termino: 'Ventilador Samurai',
      url: ['/', 'marcas', 'samurai', 'ventiladores']
    },
    {
      termino: 'Estufas Abba',
      url: ['/', 'marcas', 'estufas', 'abba']
    }

  ];

  busquedasEncontradas: any[] = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  escogerQuery() {
    if (this.terminoBusqueda.length < 3) {
      return;
    }
    this.busquedasEncontradas = this.busquedasSugeridas.filter((busqueda) => new RegExp(this.terminoBusqueda, 'gi').test(busqueda.termino))
  }

  irAbusqueda(busqueda) {
    this.router.navigate(busqueda.url);
    this.busquedasEncontradas = [];
    this.terminoBusqueda = busqueda.termino;
  }

}
