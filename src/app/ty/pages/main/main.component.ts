import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ResponsiveSidebarService } from '../../services/responsive-sidebar.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalDeseosComponent } from '../../components/modal-deseos/modal-deseos.component';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  public isDarkMode: boolean = true;
  public isSidebarLeftOpen: boolean = false;
  public isSidebarRightOpen: boolean = true;

  public showStatisticsButton: boolean = false;
  public sidebarMode: MatDrawerMode = 'side';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private sidebarService: ResponsiveSidebarService,
    private dialog: MatDialog
  ) { }

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
      next: (isOpen) => {
        if (isOpen) {
          this.sidebarMode = 'side';
          this.showStatisticsButton = false;
        }
        else{
          this.sidebarMode = 'over';
          this.showStatisticsButton = true;
        }

        this.isSidebarLeftOpen = isOpen;
        this.isSidebarRightOpen = isOpen;
      }
    })

  }


  onSetTheme(theme: string) {
    if (theme === 'dark_mode') {

      this.document.body.classList.remove('light_mode');
      this.document.body.classList.add('dark_mode');
      this.isDarkMode = true;
    }
    else {
      this.document.body.classList.remove('dark_mode')
      this.document.body.classList.add('light_mode');
      this.isDarkMode = false;
    }
  }


  listaDeseos() {
    this.dialog.open(ModalDeseosComponent,{
      width: '40%'
    })
  }

}
