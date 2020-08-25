import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TopBarComponent } from './shared/top-bar/top-bar.component';
import { SearchHeaderComponent } from './shared/top-bar/search-header/search-header.component';
import { ProductosPorCategoriaComponent } from './pages/productos/productos-por-categoria/productos-por-categoria.component';
import { ProductosPorMarcaComponent } from './pages/productos/productos-por-marca/productos-por-marca.component';
import { ProductosPorMarcaCategoriaComponent } from './pages/productos/productos-por-marca-categoria/productos-por-marca-categoria.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductosPorCategoriaPrincipalComponent } from './pages/productos/productos-por-categoria-principal/productos-por-categoria-principal.component';
import { ProductosPorSubcategoriaComponent } from './pages/productos/productos-por-subcategoria/productos-por-subcategoria.component';
import { ProductosPorMarcaSubcategoriaComponent } from './pages/productos/productos-por-marca-subcategoria/productos-por-marca-subcategoria.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProductoComponent } from './components/producto/producto.component';
import { PaginacionComponent } from './components/paginacion/paginacion.component';


import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';

import { AngularFireAuth } from '@angular/fire/auth';
import { LoginHeaderComponent } from './shared/top-bar/login-header/login-header.component';
import { CartHeaderComponent } from './shared/top-bar/cart-header/cart-header.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { OrdenacionComponent } from './components/ordenacion/ordenacion.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductoDetallesComponent } from './pages/producto-detalles/producto-detalles.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    SearchHeaderComponent,
    ProductosPorCategoriaComponent,
    ProductosPorMarcaComponent,
    ProductosPorMarcaCategoriaComponent,
    HomeComponent,
    ProductosPorCategoriaPrincipalComponent,
    ProductosPorSubcategoriaComponent,
    ProductosPorMarcaSubcategoriaComponent,
    PageNotFoundComponent,
    ProductoComponent,
    PaginacionComponent,
    LoginHeaderComponent,
    CartHeaderComponent,
    BreadcrumbComponent,
    OrdenacionComponent,
    CartComponent,
    ProductoDetallesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
