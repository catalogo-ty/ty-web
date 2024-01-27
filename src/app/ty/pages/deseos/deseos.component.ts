import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/ty/deseos.service';
import { TyDeseo } from '../../interfaces/ty.interface';

@Component({
  selector: 'app-deseos',
  templateUrl: './deseos.component.html',
  styleUrl: './deseos.component.scss'
})
export class DeseosComponent implements OnInit {

  listaDeseados: TyDeseo[] = [];

  constructor(private deseosSrv: DeseosService){}

  ngOnInit(): void {
    this.deseosSrv.obtenerTodosDeseados().subscribe({
      next:(res)=>{
        console.log('Lista', res);
        
        this.listaDeseados = res;
      }
    })
  }
  


}
