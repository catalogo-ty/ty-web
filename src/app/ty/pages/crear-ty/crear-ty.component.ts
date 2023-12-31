import { Component, OnInit } from '@angular/core';
import { CategoriaTy, Ty } from '../../interfaces/categoria.interface';
import { TyService } from '../../services/ty.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-ty',
  templateUrl: './crear-ty.component.html',
  styleUrl: './crear-ty.component.scss'
})
export class CrearTyComponent implements OnInit {

  categorias: CategoriaTy[]  = [];

  tyForm: FormGroup = this.fb.group({
    categoriaRef: ['',[Validators.required]],
    nombre: ['', [Validators.required]],
    color: ['',[Validators.required]]
  })


  constructor(
    private tyService:TyService,
    private fb: FormBuilder
    ){}

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias(){
    this.tyService.obtenerCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      }
    })
  }

  agregarTy(){

    if (this.tyForm.invalid) {
      return ;
    }

    const newTy: Ty = {
      ...this.tyForm.value,
      fechaActualizacion: new Date(),
      fechaCreacion: new Date()
    }

    console.log(this.tyForm.value);
    this.tyService.agregarTy(newTy).subscribe({
      next: (res) => {
        console.log(`Nuevo TY ID: ${res.id}`);
      },
      error: (error) => {
        console.log(error);
        
      }
    })
    
  }

}
