import { Component, OnInit } from '@angular/core';
import { FuncionesService } from 'src/app/services/funciones.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConstantesService } from 'src/app/services/constantes.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.sass']
})
export class TopBarComponent implements OnInit {

  isLogged: boolean = false;

  CATEGORIAS: any = [];
  MARCAS: any = [];

  constructor(
    public funcionesService: FuncionesService,
    private constantesService: ConstantesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.CATEGORIAS = this.constantesService.CATEGORIAS;
    this.MARCAS = this.constantesService.MARCAS;
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('Usuario logueado');
        this.isLogged = true;
      } else {
        console.log('Usuario no logueado');
        this.isLogged = false;
      }
    })
  }

  onLogout() {
    this.authService.logoutUser();
  }

}
