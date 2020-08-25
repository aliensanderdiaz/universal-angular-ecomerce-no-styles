import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductosPorCategoriaComponent } from './pages/productos/productos-por-categoria/productos-por-categoria.component';
import { ProductosPorMarcaComponent } from './pages/productos/productos-por-marca/productos-por-marca.component';
import { ProductosPorMarcaCategoriaComponent } from './pages/productos/productos-por-marca-categoria/productos-por-marca-categoria.component';
import { ProductosPorCategoriaPrincipalComponent } from './pages/productos/productos-por-categoria-principal/productos-por-categoria-principal.component';
import { ProductosPorSubcategoriaComponent } from './pages/productos/productos-por-subcategoria/productos-por-subcategoria.component';
import { ProductosPorMarcaSubcategoriaComponent } from './pages/productos/productos-por-marca-subcategoria/productos-por-marca-subcategoria.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductoDetallesComponent } from './pages/producto-detalles/producto-detalles.component';


const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'cart', component: CartComponent
  },
  {
    path: 'productos/:slug-producto', component: ProductoDetallesComponent
  },
  {
    path: 'categorias/:slug-categoria', component: ProductosPorCategoriaPrincipalComponent
  },
  {
    path: 'categorias/:slug-categoria-principal/:slug-categoria', component: ProductosPorCategoriaComponent
  },
  {
    path: 'categorias/:slug-categoria-principal/:slug-categoria/:slug-subcategoria', component: ProductosPorSubcategoriaComponent
  },
  {
    path: 'marcas/:slug-marca', component: ProductosPorMarcaComponent
  },
  {
    path: 'marcas/:slug-marca/:slug-categoria', component: ProductosPorMarcaCategoriaComponent
  },
  {
    path: 'marcas/:slug-marca/:slug-categoria/:slug-subcategoria', component: ProductosPorMarcaSubcategoriaComponent
  },
  {
    path: 'page-not-found', component: PageNotFoundComponent
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: '/page-not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
