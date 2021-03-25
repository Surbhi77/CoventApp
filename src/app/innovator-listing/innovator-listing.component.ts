import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {ApiService} from './../services/api.service';
import { FormControl, FormGroup } from '@angular/forms';

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
  categories: any=[];
  subcategoryId:any=[];
  form: FormGroup;
  total_result_count:any=0;
  shorting_value:any=[];
  orderby_value:any=[];
  shortByFilter:any='';

  constructor(private router:Router,
    private apiService:ApiService,
    private activatedRoute:ActivatedRoute) { }

    ngOnInit(): void {
      this.form =  new FormGroup({
        ordertype :new FormControl(''),
        search:new FormControl(''),
        orderby:new FormControl(''),
        limit:new FormControl('')
      })
      this.categoryId = this.activatedRoute.snapshot.params['id'];
      console.log(this.categoryId);
      this.getCategoryListing();
      this.getSubcategoryListing();
      this.getInnovationAll();
      let body = document.getElementsByTagName('body')[0];
      body.classList.add("absolute-header");


      this.shorting_value = [{"val":"ratings desc","name":"Top Rated"},{"val":"device_data_id desc","name":"New"},{"val":"device_data_id asc","name":"Old"}];


      // this.apiService.get_history().subscribe((res:any)=>{


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
      this.getInnovationAll()
      // this.searchString =
      // let obj={
      //          "keywords":"",
      //          "subcat_id":this.subCategory
      //         };
      // if(this.searchString!=''){
      //   obj.keywords = this.searchString
      // }
      // this.apiService.searchInnovatorListing(obj).subscribe(res=>{
      //   this.innovatorListing = res['data']
      // })
    }

    getSubcategoryListing() {
      this.apiService.getSubcategoryListing(this.categoryId).subscribe(res=>{
        console.log(res);
        this.getSubCategory=res['data']
      })
    }

    searchkeywords(){
      if(this.searchString==''){
        this.getInnovationAll()
      }
      // console.log('searchStringsearchString',this.searchString);
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

    filterBysubcategory(subcat_id){
      console.log('subcat_id',subcat_id);
      this.subcategoryId = subcat_id
      this.getInnovationAll();
    }

    shortBy(elements){
      console.log('elements',elements);
      this.orderby_value = elements;
      this.getInnovationAll();
    }

    getInnovationAll(){
      console.log('strinfg',this.searchString);
      let obj:any = {}
      obj.orderby=this.orderby_value
      // obj.ordertype=this.form.value.ordertype
      obj.search=this.searchString
      obj.category=this.categoryId
      obj.subcategory=this.subcategoryId
      obj.limit=this.form.value.limit
      console.log("object .....",obj)
      this.apiService.getInnovation(obj).subscribe((res:any)=>{
        this.innovationData = res.data;

        this.total_result_count = res.data.length
      console.log("Innovation data............API",this.innovationData.length)
      })


    }

/*
    openDetails(item){

      ngOnDestroy(){
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("absolute-header");
      }
    }
    */



    /*filterData(){

    //   let body = document.getElementsByTagName('body')[0];
    // body.classList.add("absolute-header");
    // this.apiService.getDeviceListing().subscribe(res=>{
    //   if(res['success']){
    //     this.categories=res['data']
    //     console.log("filter",this.categories)
    //   }
    // })
     let obj:any = {}
      obj.orderby=this.form.value.orderby
      obj.ordertype=this.form.value.ordertype
      obj.search=this.searchString
      obj.limit=this.form.value.limit
      this.apiService.getInnovation(obj).subscribe((res:any)=>{
        this.innovationData = res.data;

      console.log("Innovation data............API",this.innovationData)
      })

    }
    // filterclick(e){
    //   alert('hii')
    //   console.log('e',e)
    //   let obj:any = {}
    //   obj.orderby=e
    //   obj.ordertype=e
    //   console.log('filterclickobj',obj)
    //   this.apiService.getInnovation(obj).subscribe((res:any)=>{
    //     this.innovationData = res.data;
    //   console.log("filter data obj............API",this.innovationData)
    //   })

    // }
    */

}
