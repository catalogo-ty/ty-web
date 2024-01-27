import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveSidebarService {

  // la fuente de los datos
  private sidebarOpenSubject = new BehaviorSubject<boolean>(true);

  //observable: me suscribo para leer/obtener los datos del BehaviorSubject
  public sidebarOpen$ = this.sidebarOpenSubject.asObservable();

  constructor() {
    this.checkWindowSize();
    window.addEventListener('resize', () => { this.checkWindowSize() });
    // window.addEventListener('resize',  this.checkWindowSize.bind(this));
  }


  private checkWindowSize() {
    if (window.innerWidth <= 768) {
      this.sidebarOpenSubject.next(false);
    } else {
      this.sidebarOpenSubject.next(true);
    }
  }





}
