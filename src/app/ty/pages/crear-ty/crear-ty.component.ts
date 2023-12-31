import { Component, OnInit } from '@angular/core';
import { CategoriaTy } from '../../interfaces/categoria.interface';
import { TyService } from '../../services/ty.service';

@Component({
  selector: 'app-crear-ty',
  templateUrl: './crear-ty.component.html',
  styleUrl: './crear-ty.component.scss'
})
export class CrearTyComponent implements OnInit {

  categorias: CategoriaTy[]  = [];

  constructor(private tyService:TyService){}

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias(){
    this.tyService.obtenerCategorias().subscribe({
      next: (data) => {
        console.log(data);
        
        this.categorias = data;
      }
    })
  }


}
