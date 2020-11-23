import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    let body = document.getElementsByTagName('body')[0];
        body.classList.remove("nb-theme-material-light");
      
    body.style.removeProperty('overflow')

  }

}
