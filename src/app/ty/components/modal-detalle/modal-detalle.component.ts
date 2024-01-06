import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ty } from '../../interfaces/ty.interface';

@Component({
  selector: 'app-modal-detalle',
  templateUrl: './modal-detalle.component.html',
  styleUrl: './modal-detalle.component.scss'
})
export class ModalDetalleComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ModalDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public ty: any
  ){}


  ngOnInit(){
    console.log( this.ty );
    
  }

  cerrarModal(){
    this.dialogRef.close();
  }





}
