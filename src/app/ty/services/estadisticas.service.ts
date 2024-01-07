import { Injectable } from '@angular/core';
import { TyService } from './ty.service';
import { Observable, map } from 'rxjs';
import { Ty } from '../interfaces/ty.interface';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  constructor(
    private tyService: TyService
  ) { }


  // Obtener lista de Ty
  obtenerTotalesTy() {
    return this.tyService.obtenerListaTy().pipe(
      map( (listaTy) =>{
        return listaTy.length;
      } )
    )
  }


  obtenerNumeroTyPorCategoria(): Observable<{ categoria: string, total: number }[]> {
    return this.tyService.obtenerListaTy().pipe(
      map((tyList: Ty[]) => {
        const categoriasTotales: { [key: string]: number } = {};

        tyList.forEach((ty: Ty) => {
          const categoria = ty.categoriaRef || 'Sin categoría';
          categoriasTotales[categoria] = (categoriasTotales[categoria] || 0) + 1;
        });

        return Object.keys(categoriasTotales).map((categoria) => ({
          categoria,
          total: categoriasTotales[categoria]
        }));
      })
    );
  }


}
