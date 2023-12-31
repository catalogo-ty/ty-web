import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CategoriaTy } from '../interfaces/categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class TyService {

  constructor(private firestore: Firestore) { }

  // Nueva forma de inyeccion de dependecias
  //private firestore = inject(Firestore)

  // referencias
  private categoriaRef = collection(this.firestore, 'categoria');


  // Obtener todas las categorias de Firebase
  obtenerCategorias(){
    return collectionData(this.categoriaRef, { idField: 'id' }) as Observable<CategoriaTy[]>
  }



}
