import { Component, Input } from '@angular/core';
import { TyDeseo } from '../../interfaces/ty.interface';
import { DeseosService } from '../../services/ty/deseos.service';
import { AlertasService } from '../../services/utils/alertas.service';

@Component({
  selector: 'ty-card-deseos',
  templateUrl: './card-deseos.component.html',
  styleUrl: './card-deseos.component.scss'
})
export class CardDeseosComponent {

  @Input()
  infoTyDeseado!: TyDeseo;

  constructor(private deseosSrv: DeseosService,
              private alertaSrv: AlertasService){}

  borrarDeseado(){
    console.log(this.infoTyDeseado);
    

    this.deseosSrv.borrarDeseado(this.infoTyDeseado.id!).subscribe({
      next:()=>{
        this.alertaSrv.mensajeAlerta('Ty Borrado', 'Ty eliminado de la lista de deseos', 'success')        
      }
    })
    
  }
  

}
