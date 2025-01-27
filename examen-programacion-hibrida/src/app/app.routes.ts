import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { CrearPublicacionPage } from './crear-publicacion/crear-publicacion.page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'home', component: HomePage },
  { path: 'crear-publicacion', component: CrearPublicacionPage },
];