import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable, from, map, switchMap, tap } from 'rxjs';
import { CategoriaTy, Ty } from '../interfaces/categoria.interface';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage'

@Injectable({
  providedIn: 'root'
})
export class TyService {

  constructor(
    private firestore: Firestore,
    private storage: Storage) { }

  // Nueva forma de inyeccion de dependecias
  //private firestore = inject(Firestore)

  // referencias
  private categoriaRef = collection(this.firestore, 'categoria');

  // Obtener todas las categorias de Firebase
  obtenerCategorias() {
    return collectionData(this.categoriaRef, { idField: 'id' }) as Observable<CategoriaTy[]>
  }

  // Agregar Ty
  agregarTy(ty: Ty) {

    const imagePath = `ty/${ty.imageUrl.name}`;
    const imageRef = ref(this.storage, imagePath);
    const imageTask = uploadBytes(imageRef, ty.imageUrl);


    return from(imageTask).pipe(

      switchMap( () => getDownloadURL(imageRef)),
      switchMap( (url: string) => {

        const tyData = {
          categoriaRef: ty.categoriaRef,
          nombre: ty.nombre,
          color: ty.color,
          fechaCreacion: ty.fechaCreacion,
          fechaActualizacion: ty.fechaActualizacion,
          imageUrlText: url,
          
        };

        return addDoc( collection(this.firestore, 'ty'), tyData );
      })
    );
  }

}
