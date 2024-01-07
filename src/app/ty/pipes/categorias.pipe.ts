import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categorias'
})
export class CategoriasPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case '1':
        return 'Ositos'
      
      case '2':
        return 'Animales'
      
      case '3':
        return 'Otros'
    
      default: return ''
    }
  }

}
