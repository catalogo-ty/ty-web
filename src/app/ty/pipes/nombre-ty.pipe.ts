import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreTy'
})
export class NombreTyPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/_/g, ' ');
  }

}
