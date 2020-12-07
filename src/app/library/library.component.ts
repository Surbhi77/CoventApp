import { Component, OnInit } from '@angular/core';
import {ApiService} from './../services/api.service';
import {Router} from '@angular/router';
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

}
