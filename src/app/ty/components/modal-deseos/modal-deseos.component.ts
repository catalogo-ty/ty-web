import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DeseosService } from '../../services/ty/deseos.service';
import { AlertasService } from '../../services/utils/alertas.service';

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
    private modalDeseosRef: MatDialogRef<ModalDeseosComponent>,
    private deseosService: DeseosService,
    private alertaService: AlertasService){}


  agregarDeseado(){
    this.deseosService.agregarDeseo(this.deseosForm.value).subscribe({
      next: (res)=>{
        this.alertaService.mensajeAlerta('Ty agregado a la lista de deseos', 'Espero que encuentres a este pequeño', 'success')
      }
    })
    
    this.deseosForm.reset();
  }

  cerrarModal(){
    this.modalDeseosRef.close();
  }



}
