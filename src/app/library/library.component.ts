import { Component, OnInit } from '@angular/core';
import {ApiService} from './../services/api.service';
import {Router} from '@angular/router';
import {environment} from 'environments/environment'

@Component({
  selector: 'ngx-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  categories: any=[];
  baseImageUrl=environment.imageUrl;

  constructor(private apiService:ApiService,private router:Router) { }

  ngOnInit():void {
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("absolute-header");
    this.apiService.getDeviceListing().subscribe(res=>{
      if(res['success']){
        this.categories=res['data']
      }
    })
  }

  navigateToDetail(item){
    let url = '/innovator-listing/'+item.category_id;
    this.router.navigate([url]);
    return false;
  }

  ngOnDestroy(){
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove("absolute-header");
  }

}
