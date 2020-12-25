import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
import {ApiService} from  './../../services/api.service';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-review-listing',
  templateUrl: './review-listing.component.html',
  styleUrls: ['./review-listing.component.scss']
})
export class ReviewListingComponent implements OnInit {
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right'
      },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    view:{
      viewButtonContent: '<i class="nb-trash"></i>',
    },
    columns: {
      // id: {
      //   title: 'S.no',
      //   type: 'number',
      //   filter: false
      // },
      title: {
        title: 'Title',
        type: 'string',
        filter: false
      },
      desccription: {
        title: 'Desccription',
        type: 'string',
        filter: false
      },
      ratings: {
        title: 'Ratings',
        type: 'string',
        filter: false
      },
      user_name: {
        title: 'Username',
        type: 'string',
        filter: false
      },
      created_at: {
        title: 'Create Date',
        type: 'date',
        filter: false
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  deviceListing: any;
  innovator_Id:any;

  constructor(private apiService:ApiService,private service: SmartTableData,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      console.log(params);
      if(params && params.innovator_id){
        
        this.innovator_Id= params.innovator_id;
      }
      
      // this.orderId = params.id;
      // this.getOrderDetails()
    })
    console.log(this.innovator_Id);
    let userDetails = JSON.parse(localStorage.getItem("userData"));
    let obj={
      "user_id":userDetails.id
    }
    
    
    this.apiService.getReviewListingByInnovator(this.innovator_Id).subscribe(res=>{
      if(res["success"]){
        this.deviceListing = res['data'];
        console.log(this.deviceListing);
        this.deviceListing.forEach((currentValue, index) => {
          currentValue.id = index+1
        });
        this.source.load(this.deviceListing)
      }else{
        this.deviceListing = [];
      }
    })
    
    console.log("success")
  }

}
