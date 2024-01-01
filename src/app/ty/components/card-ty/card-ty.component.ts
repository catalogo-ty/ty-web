import { Component, Input } from '@angular/core';
import { Ty } from '../../interfaces/ty.interface';

@Component({
  selector: 'card-ty',
  templateUrl: './card-ty.component.html',
  styleUrl: './card-ty.component.scss'
})
export class CardTyComponent {

  @Input({required: true})
  public ty!: Ty


}
