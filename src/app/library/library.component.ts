import { Component, OnInit } from '@angular/core';
import {ApiService} from './../services/api.service';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  categories: any=[];
  baseImageUrl="http://134.209.68.96:9700";

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
