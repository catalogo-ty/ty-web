import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveSidebarService {

  // la fuente de los datos
  private sidebarOpenSubject = new BehaviorSubject<boolean>(true);
  
  //observable: me suscribo para leer/obtener los datos del BehaviorSubject
  public sidebarOpen$  = this.sidebarOpenSubject.asObservable();

  constructor() { 
    window.addEventListener('resize', ()=>{ this.checkWindowSize() });

  }


  private checkWindowSize(){
    if (window.innerWidth <= 768) {
      this.sidebarOpenSubject.next(false);
    }else{
      this.sidebarOpenSubject.next(true);
    }
  }





}
