import { Component } from '@angular/core';
import { EstadisticasService } from '../../services/ty/estadisticas.service';

@Component({
  selector: 'ty-card-estadisticas',
  templateUrl: './card-estadisticas.component.html',
  styleUrl: './card-estadisticas.component.scss'
})
export class CardEstadisticasComponent {

  tyPorCategoria$ = this.estadisticasService.obtenerNumeroTyPorCategoria();
  tyTotales$ = this.estadisticasService.obtenerTotalesTy();

  constructor(
    private estadisticasService: EstadisticasService
  ){

  }

}
