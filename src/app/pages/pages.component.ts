import { Component } from '@angular/core';

import { MENU_ITEMS,REVIEWER_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu" class="menus_lis"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu:any; 
  isReviewer:boolean=false 

  constructor(){
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("nb-theme-material-light");
  }

  ngOnInit(){
    let userDetails = JSON.parse(localStorage.getItem("userData"));
    if(userDetails.user_type == 2){
      this.isReviewer=true;
      this.menu = REVIEWER_ITEMS
    }else{
      this.isReviewer=false;
      this.menu=MENU_ITEMS
    }
  }
}
