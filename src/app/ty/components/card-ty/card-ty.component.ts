import { Component, Input } from '@angular/core';
import { Ty } from '../../interfaces/ty.interface';
import { MatDialog } from '@angular/material/dialog';
import { ModalDetalleComponent } from '../modal-detalle/modal-detalle.component';

@Component({
  selector: 'card-ty',
  templateUrl: './card-ty.component.html',
  styleUrl: './card-ty.component.scss'
})
export class CardTyComponent {

  @Input({required: true})
  public ty!: Ty

  constructor(private dialog: MatDialog){}

  verDetalle(ty: Ty){

    const TyModal = {
      id: ty.id,
      nombre: ty.nombre,
      color: ty.color,
      categoriaRef: ty.categoriaRef,
      imageUrlText: ty.imageUrlText,
      creacion: new Date(ty.fechaCreacion.seconds * 1000),
      actualizacion: new Date(ty.fechaActualizacion.seconds * 1000)
    }


    this.dialog.open(ModalDetalleComponent, {
      data: TyModal
    })
  }
}
