import { Component } from '@angular/core';
import { TyService } from '../../services/ty.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.scss'
})
export class ListadoComponent {

  constructor(private tyService: TyService){}

  listaTy$ = this.tyService.obtenerListaTy();

  





}
