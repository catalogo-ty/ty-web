import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { CategoriaTy, Ty } from '../interfaces/categoria.interface';

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

  // Agregar Ty
  agregarTy(ty: Ty){
    // Tranformar promesa a observable
    const promise =  addDoc( collection(this.firestore, 'ty'), ty );
    return from(promise);
  }

}
