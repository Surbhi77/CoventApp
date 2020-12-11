import { Component, OnInit } from '@angular/core';
import {ApiService} from './../services/api.service'
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredInnovatorListing:any=[];
  featuredCategories:any=[];
  assetUrl:any='http://localhost:9700/'

  constructor(private apiService:ApiService,private router:Router) { }

  ngOnInit(): void {

    let body = document.getElementsByTagName('body')[0];
        body.classList.remove("nb-theme-material-light");
    this.getAllFeaturedData();
    this.getAllFeaturedCategories();
  }

  getAllFeaturedData() {
   this.apiService.getFeaturedInnovationListing().subscribe(res=>{
     console.log(res);
     this.featuredInnovatorListing=res['data']
   }) 
  }

  getAllFeaturedCategories(){
    this.apiService.getFeaturedCategories().subscribe(res=>{
      console.log(res);
      this.featuredCategories =res['data']
    })
  }

  navigateToCategory(item){
    //alert("here")
    this.router.navigateByUrl('/innovator-listing/'+item.category_id)
  }

  navigateToDetail(item){
    this.router.navigateByUrl('/library-details/'+item.device_data_id)
  }

}
