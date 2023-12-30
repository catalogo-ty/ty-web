import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { CrearTyComponent } from './pages/crear-ty/crear-ty.component';
import { ListadoComponent } from './pages/listado/listado.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children:[
        {
            path:'crear', component: CrearTyComponent
        },
        {
            path:'listar', component: ListadoComponent
        },
        {
            path:'**', redirectTo: 'listar'
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TyRoutingModule { }