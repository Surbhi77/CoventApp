import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {ApiService} from './../services/api.service';
import {environment} from 'environments/environment'
@Component({
  selector: 'ngx-innovator-listing',
  templateUrl: './innovator-listing.component.html',
  styleUrls: ['./innovator-listing.component.scss']
})
export class InnovatorListingComponent implements OnInit {
  categoryId: any;
  innovatorListing:any=[];
  imageBasePath:any=environment.imageUrl;
  getSubCategory: any=[];
  searchString:any='';
  subCategory:any=0;
  innovationData: any=[];
  currentRate: any;
  assetUrl:any=environment.imageUrl;
  notfound: boolean=false;

  constructor(private router:Router,
    private apiService:ApiService, 
    private activatedRoute:ActivatedRoute) { }

    ngOnInit(): void {
      this.categoryId = this.activatedRoute.snapshot.params['id'];
      console.log(this.categoryId);
      this.getCategoryListing();
      this.getSubcategoryListing();
 this.getInnovationAll();
      let body = document.getElementsByTagName('body')[0];
      body.classList.add("absolute-header");
    }

    onImgError($event){
      $event.target.src = './assets/images/placeholder.jpg'
    }

    modelChanged($event){
      console.log($event);
      let obj={
        "keywords":this.searchString,
        "subcat_id":0
      };
      if(this.subCategory>0){
        obj.subcat_id=this.subCategory
      }
      this.apiService.searchInnovatorListing(obj).subscribe(res=>{
        this.innovatorListing = res['data']
      })
    }

    searchChanged(){
      console.log(this.searchString)
      let obj={
               "keywords":"",
               "subcat_id":this.subCategory
              };
      if(this.searchString!=''){
        obj.keywords = this.searchString
      }
      this.apiService.searchInnovatorListing(obj).subscribe(res=>{
        this.innovatorListing = res['data']
      })
    }

    getSubcategoryListing() {
      this.apiService.getSubcategoryListing(this.categoryId).subscribe(res=>{
        console.log(res);
        this.getSubCategory=res['data']
      })
    }

    getCategoryListing(){
      let obj={
        category_id:this.categoryId
      }
      this.apiService.getInnovationListing(obj).subscribe(res=>{
        console.log(res);
        if(res['success']){
          this.innovatorListing = res['data']
        }
      })
    }
    getInnovationAll(){
      this.apiService.getInnovation(16).subscribe((res:any)=>{
        this.innovationData = res.data;
        
      console.log("Innovation data............",this.innovationData)
      })
      // if(this.searchString!=this.innovationData.device_name && this.innovationData.device_name==''){
      //   this.notfound = true
      // }
      // else{
      //   this.notfound = false
      // }
      // this.innovationData.forEach(element => {
      //   element.ratings = this.currentRate 
      //   if(this.searchString!=element.device_name){
      //     this.notfound = true
      //   }
      //   else{
      //     this.notfound = false
      //   }
        
      //});
    }
    openDetails(item){
      this.router.navigateByUrl('/library-details/'+item.device_data_id);
      return false;
    }
    navigateToDetail(item){
      this.router.navigateByUrl('/library-details/'+item.device_data_id)
    }

    ngOnDestroy(){
      let body = document.getElementsByTagName('body')[0];
      body.classList.remove("absolute-header");
    }

}
