import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TyService } from '../../services/ty.service';
import { switchMap } from 'rxjs';
import { Ty } from '../../interfaces/ty.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertasService } from '../../services/alertas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-ty',
  templateUrl: './editar-ty.component.html',
  styleUrl: './editar-ty.component.scss'
})
export class EditarTyComponent implements OnInit {

  tyParaEditar!: Ty | undefined
  selectedFile: any = null;
  imagenPreCargada: any = null
  categorias$ = this.tyService.obtenerCategorias();

  // Formulario Reactivo
  formEditar: FormGroup = this.fb.group({
    categoriaRef: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    color: ['', [Validators.required]],
    imageUrl: [null, [Validators.required]]
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tyService: TyService,
    private fb: FormBuilder,
    private alertaService: AlertasService
  ) { }

  ngOnInit() {
    /* this.route.params.subscribe({
      next: (params)=>{
        //console.log(params['id']);
        const tyId = params['id'];
        this.tyService.obtenerTyPorId(tyId).subscribe({
          next:(res)=>{
            console.log('Ty del servicio', res);
          }
        })
      }
    }) */

    this.route.params.pipe(
      switchMap((params: Params) => {
        const tyId = params['id'];

        return this.tyService.obtenerTyPorId(tyId);
      })
    ).subscribe({
      next: (res) => {
        console.log(res);
        this.tyParaEditar = res
        this.formEditar.reset(this.tyParaEditar);

      }
    })

  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
    this.formEditar.get('imageUrl')?.setValue(this.selectedFile);

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagenPreCargada = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }


  editarTy() {

    if (this.formEditar.get('nombre')?.hasError('required')) {
      this.alertaService.mensajeAlerta('Notificación', 'Debe ingresar un nombre para actualizar', 'info')
      return;
    }

    if (this.formEditar.get('color')?.hasError('required')) {
      this.alertaService.mensajeAlerta('Notificación', 'Debe ingresar un color para actualizar', 'info')
      return;
    }

    console.log(this.formEditar.value);

    this.tyService.actualizarTy(this.formEditar.value, this.tyParaEditar!).subscribe({
      next: () => {
        this.alertaService.mensajeAlerta('Ty actualizado', 'Datos del ty actualizados exitosamente', 'success')
        this.router.navigateByUrl('/listado')
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

        this.tyService.eliminarTy(this.tyParaEditar!).subscribe({
          next: () => {
            this.alertaService.mensajeAlerta('Ty Eliminado', 'Ty Eliminado exitosamente', 'info');
            this.router.navigateByUrl('/listado')
          },
          error: (error) => {
            console.log(error);

          }
        })
      }
    });
  }








}
