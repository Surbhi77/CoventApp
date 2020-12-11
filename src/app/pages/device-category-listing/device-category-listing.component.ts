import { Component, OnInit } from '@angular/core';
import {ApiService} from  './../../services/api.service';

@Component({
  selector: 'ngx-device-category-listing',
  templateUrl: './device-category-listing.component.html',
  styleUrls: ['./device-category-listing.component.scss']
})
export class DeviceCategoryListingComponent implements OnInit {
  dtOptions:DataTables.Settings = {};
  deviceCategories:any=[];

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(){
    this.apiService.getDeviceCategoryListing().subscribe(res=>{
      console.log(res);
      this.deviceCategories=res['data']
    })
  }

  makeUnfeatured(item,i){
    let obj={
      "featured":"0", 
	    "category_id":item.category_id
    }
    this.apiService.makeFeaturedCategory(obj).subscribe(res=>{
     this.deviceCategories[i].category_featured=0;
    })
  }

  makeFeatured(item,i){
    let obj={
      "featured":"1", 
	    "category_id":item.category_id
    }
    this.apiService.makeFeaturedCategory(obj).subscribe(res=>{
     this.deviceCategories[i].category_featured=1;
    })
  }

}
