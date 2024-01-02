import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, orderBy, query, setDoc } from '@angular/fire/firestore';
import { Observable, catchError, from, map, of, switchMap, tap } from 'rxjs';
import { CategoriaTy, Ty } from '../interfaces/ty.interface';
import { Storage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage'

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
  private tyRef = collection(this.firestore, 'ty');


  // Obtener todas las categorias de Firebase
  obtenerCategorias() {
    return collectionData(this.categoriaRef, { idField: 'id' }) as Observable<CategoriaTy[]>
  }

  // Agregar Ty
  agregarTy(ty: Ty) {

    const imagePath = `ty/${ty.nombre.replace(/\s+/g, '_')}`;
    const imageRef = ref(this.storage, imagePath);
    const imageTask = uploadBytes(imageRef, ty.imageUrl);


    return from(imageTask).pipe(

      switchMap(() => getDownloadURL(imageRef)),
      switchMap((url: string) => {

        const tyData = {
          categoriaRef: ty.categoriaRef,
          nombre: ty.nombre.replace(/\s+/g, '_'),
          color: ty.color,
          fechaCreacion: ty.fechaCreacion,
          fechaActualizacion: ty.fechaActualizacion,
          imageUrlText: url,

        };

        return addDoc(collection(this.firestore, 'ty'), tyData);
      })
    );
  }

  // Obtener lista de Ty
  obtenerListaTy() {
    // ordenar por fecha creacion
    const q = query(this.tyRef, orderBy('fechaCreacion', 'desc'));

    return collectionData(q, { idField: 'id' }) as Observable<Ty[]>
  }

  actualizarTy(newty: Ty, oldTy: Ty): Observable<void> {

    // Referencia al Ty original para su actualización
    const tyDocRef = doc(this.firestore, 'ty', oldTy.id!);

    if (newty.imageUrl && newty.imageUrl.name) {
      // Borrar imagen previa
      const oldImageRef = ref(this.storage, `ty/${oldTy.nombre}`);

      from(deleteObject(oldImageRef)).pipe(
        catchError((error) => {
          console.error('Error al borrar la imagen antigua:', error);
          return of(null);
        })
      );

      // Generar nueva imagen
      const imagePath = `ty/${newty.nombre.replace(/\s+/g, '_')}`;
      const imageRef = ref(this.storage, imagePath);
      const imageTask = uploadBytes(imageRef, newty.imageUrl);

      return from(imageTask).pipe(
        switchMap(() => getDownloadURL(imageRef)),
        switchMap((url: string) => {
          newty.imageUrlText = url; // Actualizar la URL de la imagen en los datos a guardar
          return from(setDoc(tyDocRef,
            {
              categoriaRef: newty.categoriaRef,
              nombre: newty.nombre.replace(/\s+/g, '_'),
              color: newty.color,
              fechaActualizacion: new Date(),
              imageUrlText: newty.imageUrlText,
            },
            { merge: true }));
        })
      )

    }
    else {
      return from(setDoc(tyDocRef,
        {
          categoriaRef: newty.categoriaRef,
          nombre: newty.nombre.replace(/\s+/g, '_'),
          color: newty.color,
          fechaActualizacion: new Date(),
        }
        ,{ merge: true }));
    }
  }


  // eliminar un ty
  eliminarTy(ty: Ty){

    const tyDocRef = doc( this.firestore, 'ty', ty.id! )
    const promiseDelete = deleteDoc(tyDocRef)

    // eliminar la imagen de firebase
    const oldImageRef = ref(this.storage, `ty/${ty.nombre}`);

    from(deleteObject(oldImageRef)).pipe(
      catchError((error) => {
        console.error('Error al borrar la imagen:', error);
        return of(null);
      })
    );

    return from(promiseDelete)


  }




}
