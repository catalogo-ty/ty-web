import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './pages/listado/listado.component';
import { CrearTyComponent } from './pages/crear-ty/crear-ty.component';
import { CardTyComponent } from './components/card-ty/card-ty.component';
import { BuscadorComponent } from './components/buscador/buscador.component';



@NgModule({
  declarations: [
  
    ListadoComponent,
       CrearTyComponent,
       CardTyComponent,
       BuscadorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TyModule { }
