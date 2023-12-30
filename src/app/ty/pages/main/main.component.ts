import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{

  public isDarkMode: boolean = true;

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ){}

    ngOnInit(): void {
      if (this.isDarkMode) {
        this.document.body.classList.remove('light_mode');
      this.document.body.classList.add('dark_mode');
      }
      else {
        this.document.body.classList.remove('dark_mode')
        this.document.body.classList.add('light_mode');
      }
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
