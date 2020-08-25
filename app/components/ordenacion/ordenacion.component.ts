import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ordenacion',
  templateUrl: './ordenacion.component.html',
  styleUrls: ['./ordenacion.component.sass']
})
export class OrdenacionComponent implements OnInit {

  @Output() ordenCambio = new EventEmitter<string>();
  
  ordenado = [
    {nombre: 'A-Z', value:'ascendente'},
    {nombre: 'Z-A', value:'descendente'},
    {nombre: 'Precio Menor', value:'precioMenor'},
    {nombre: 'Precio Mayor', value:'precioMayor'},
  ];


  ordenPor: string = 'precioMenor';

  constructor() { }

  ngOnInit() {
  }

  cambiarOrden() {
    console.log({ordenPor: this.ordenPor});
    
    this.ordenCambio.emit(this.ordenPor);
  }

}
