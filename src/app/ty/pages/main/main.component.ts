import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ResponsiveSidebarService } from '../../services/responsive-sidebar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{

  public isDarkMode: boolean = true;
  public isSidebarOpen: boolean = true;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private sidebarService: ResponsiveSidebarService
  ){}

    ngOnInit(): void {

      // Modo claro - oscuro
      if (this.isDarkMode) {
        this.document.body.classList.remove('light_mode');
      this.document.body.classList.add('dark_mode');
      }
      else {
        this.document.body.classList.remove('dark_mode')
        this.document.body.classList.add('light_mode');
      }

      // Sidebar Responsivo
      this.sidebarService.sidebarOpen$.subscribe({
        next:(isOpen)=>{
          this.isSidebarOpen = isOpen;
        }
      })

    }


  onSetTheme(theme: string){
    if (theme === 'dark_mode') {

      this.document.body.classList.remove('light_mode');
      this.document.body.classList.add('dark_mode');
      this.isDarkMode = true;
    }
    else{
      this.document.body.classList.remove('dark_mode')
      this.document.body.classList.add('light_mode');
      this.isDarkMode = false;
    }
  }


}
