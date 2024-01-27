import { Component, OnInit } from '@angular/core';
import { CategoriaTy, Ty } from '../../interfaces/ty.interface';
import { TyService } from '../../services/ty/ty.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AlertasService } from '../../services/utils/alertas.service';

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
    private fb: FormBuilder,
    private router: Router,
    private alertaService: AlertasService
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
      this.alertaService.mensajeAlerta('Notificación', 'Debe agregar una categoria', 'info')
      return;
    }

    if (this.tyForm.get('nombre')?.hasError('required')) {
      this.alertaService.mensajeAlerta('Notificación', 'Debe agregar un nombre', 'info')
      return;
    }

    if (this.tyForm.get('color')?.hasError('required')) {
      this.alertaService.mensajeAlerta('Notificación', 'Debe agregar un color', 'info')
      return;
    }

    if (this.tyForm.get('imageUrl')?.hasError('required')) {
      this.alertaService.mensajeAlerta('Notificación', 'Debe agregar una imagen', 'info')
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
        this.alertaService.mensajeAlerta('Nuevo Ty', 'Ty agregado exitosamente', 'success');
        //redireccionar a listado
        this.router.navigateByUrl('/listado');
      },
      error: (error) => {
        console.log(error);

      }
    })

  }

}
