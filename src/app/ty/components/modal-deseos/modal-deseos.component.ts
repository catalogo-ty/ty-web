import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-deseos',
  templateUrl: './modal-deseos.component.html',
  styleUrl: './modal-deseos.component.scss'
})
export class ModalDeseosComponent {

  public urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;


  deseosForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    urlImagen: ['', [Validators.required, Validators.pattern(this.urlPattern)]]
  })

  constructor(private fb:FormBuilder,
    private modalDeseosRef: MatDialogRef<ModalDeseosComponent>){}

  agregarDeseado(){
    console.log(this.deseosForm.value);
    
    this.deseosForm.reset();
  }

  cerrarModal(){
    this.modalDeseosRef.close();
  }



}
