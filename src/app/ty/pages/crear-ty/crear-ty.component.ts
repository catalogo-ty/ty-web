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

  categorias: CategoriaTy[] = [];
  selectedFile: any = null;

  tyForm: FormGroup = this.fb.group({
    categoriaRef: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    color: ['', [Validators.required]],
    imageUrl: [null, [Validators.required]]
  })


  constructor(
    private tyService: TyService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.tyService.obtenerCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      }
    })
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
    this.tyForm.get('imageUrl')?.setValue(this.selectedFile);
  }

  agregarTy() {

    if (this.tyForm.get('categoriaRef')?.hasError('required')) {
      console.log('Categoria es requerida');
      return;
    }

    if (this.tyForm.get('imageUrl')?.hasError('required')) {
      console.log('Imagen es requerida');
      return;
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
