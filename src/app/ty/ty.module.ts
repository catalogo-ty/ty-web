import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './pages/listado/listado.component';
import { CrearTyComponent } from './pages/crear-ty/crear-ty.component';
import { CardTyComponent } from './components/card-ty/card-ty.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { TyRoutingModule } from './ty-routing.module';
import { MainComponent } from './pages/main/main.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [

    ListadoComponent,
    CrearTyComponent,
    CardTyComponent,
    BuscadorComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    TyRoutingModule,
    MaterialModule
  ]
})
export class TyModule { }
