import { Component, OnInit } from '@angular/core';
import { FuncionesService } from 'src/app/services/funciones.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  marcas: string[] = [
    'Abba',
    'Altezza',
    'Bionaire',
    'Black & Decker',
    'Bon Lari',
    'Breeze Line',
    'Certificado',
    'Coldelec',
    'Continental',
    'Corona',
    'Dkasa',
    'G-Shark',
    'Generico',
    'Haceb',
    'Home Elements',
    'Imusa',
    'Incametal',
    'India',
    'Kalley',
    'Oster',
    'Samurai',
    'Shimasu',
    'Spring',
    'Sueco',
    'Umco',
    'Universal',
    'Vajillas Corona',
    'Visivo',
    'Yamagas'
  ];

  constructor(
    public funcionesService: FuncionesService
  ) { }

  ngOnInit() {
  }

}
