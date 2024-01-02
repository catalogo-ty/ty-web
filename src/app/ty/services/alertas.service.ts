import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  public mensajeAlerta(title: string, text: string, icon: 'success' | 'info' | 'error' |'warning'|'question'){
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showConfirmButton: false,
      timer: 2500
    });
  }



}
