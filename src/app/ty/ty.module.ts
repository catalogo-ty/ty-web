import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './pages/listado/listado.component';
import { CrearTyComponent } from './pages/crear-ty/crear-ty.component';
import { CardTyComponent } from './components/card-ty/card-ty.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { TyRoutingModule } from './ty-routing.module';
import { MainComponent } from './pages/main/main.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeseosComponent } from './pages/deseos/deseos.component';



@NgModule({
  declarations: [

    ListadoComponent,
    CrearTyComponent,
    CardTyComponent,
    BuscadorComponent,
    MainComponent,
    DeseosComponent
  ],
  imports: [
    CommonModule,
    TyRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class TyModule { }
