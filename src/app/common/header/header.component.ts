import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common'
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import {ApiService} from './../../services/api.service'
@Component({
  selector: 'ngx-app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userLoggedIn:boolean=false;
  showHeader:boolean=false
  constructor(private location:Location,
              private apiService:ApiService,
              private router:Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((val)=>{
      if(this.location.path().indexOf('pages')>-1){
        //alert("in if")
        this.showHeader=true;
        
      }else{
         this.showHeader=false;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("nb-theme-material-light");
        body.style.removeProperty('overflow');
      }
    });
    if(localStorage.getItem("userData")){
      this.userLoggedIn=true
    }else{
      this.userLoggedIn=false
    }

    this.apiService.userLoggedOutorIn$.subscribe(res=>{
      if(res == 0){
        this.userLoggedIn=false
      }else{
        this.userLoggedIn=true;
      }
    })
  }

}
