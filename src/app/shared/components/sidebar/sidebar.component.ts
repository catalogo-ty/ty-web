import { Component } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  sidebarRoutes = [
    {
      router: '/crear',
      icon: 'playlist_add',
      label: 'Agregar',
    },
    {
      router: '/listar',
      icon: 'pets',
      label: 'Listado'
    },
    
  ]










}
