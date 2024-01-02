import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TyService } from '../../services/ty.service';
import { CategoriaTy } from '../../interfaces/ty.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertasService } from '../../services/alertas.service';

@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrl: './modal-editar.component.scss'
})
export class ModalEditarComponent implements OnInit {

  categorias$ = this.tyService.obtenerCategorias();
  selectedFile: any = null;
  imagenPreCargada: any = null

  tyEditForm: FormGroup = this.fb.group({
    categoriaRef: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    color: ['', [Validators.required]],
    imageUrl: [null, [Validators.required]]
  })

  constructor(
    private dialogRef: MatDialogRef<ModalEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public ty: any,
    private tyService: TyService,
    private fb: FormBuilder,
    private alertaService: AlertasService
  ) { }

  ngOnInit(): void {
    this.tyEditForm.reset(this.ty);
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
    this.tyEditForm.get('imageUrl')?.setValue(this.selectedFile);

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagenPreCargada = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }


  cerrarModal(): void {
    this.dialogRef.close();
  }

  editarTy() {

    if (this.tyEditForm.get('nombre')?.hasError('required')) {
      this.alertaService.mensajeAlerta('Notificación', 'Debe ingresar un nombre para actualizar', 'info')
      return;
    }

    if (this.tyEditForm.get('color')?.hasError('required')) {
      this.alertaService.mensajeAlerta('Notificación', 'Debe ingresar un color para actualizar', 'info')
      return;
    }

    console.log(this.tyEditForm.value);

    this.tyService.actualizarTy(this.tyEditForm.value, this.ty).subscribe({
      next: () => {
        this.alertaService.mensajeAlerta('Ty actualizado', 'Datos del ty actualizados exitosamente', 'success')
        this.dialogRef.close();

      },
      error: (error) => {
        console.log(error);

      }
    })

  }


  eliminarTy() {

    Swal.fire({
      title: "¿Desea eliminar este Ty?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {

        this.tyService.eliminarTy(this.ty).subscribe({
          next: () => {
            Swal.fire({
              title: "Ty eliminado",
              icon: "info",
              showConfirmButton: false,
              timer: 2500
            });
            this.dialogRef.close();// cerrar modal
          },
          error: (error) => {
            console.log(error);

          }
        })

      }
    });

  }



}
