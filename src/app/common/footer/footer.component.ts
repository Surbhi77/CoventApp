import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  userLoggedIn:boolean=false;

  constructor(private location:Location,private router:Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((val)=>{
      if(this.location.path().indexOf('pages')>-1){
        //alert("in if")
        this.userLoggedIn=true
      }else{
        this.userLoggedIn=false;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("nb-theme-material-light");
        body.style.removeProperty('overflow');
      }
    })
  }

}
