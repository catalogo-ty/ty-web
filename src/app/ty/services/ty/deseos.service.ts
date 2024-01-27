import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, orderBy, query } from '@angular/fire/firestore';
import { TyDeseo } from '../../interfaces/ty.interface';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  // referencia de firebase
  private deseosRef = collection(this.firestore, 'deseos');

  constructor(
    private firestore: Firestore
  ) { }

  agregarDeseo(tyDeseo: TyDeseo){
    return from( addDoc(this.deseosRef, tyDeseo) )
  }
  

  obtenerTodosDeseados(){
    const q = query(this.deseosRef);

    // Ademas debemos pasarle el id
    return collectionData(q, {idField: 'id'}) as Observable<TyDeseo[]>
  }

  borrarDeseado(id: string){
    const tyDocRef = doc(this.firestore, 'deseos', id)
    return from(deleteDoc(tyDocRef))

  }

}
