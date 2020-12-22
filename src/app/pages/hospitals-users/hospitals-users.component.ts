import { Component, OnInit } from '@angular/core';
import {ApiService} from  './../../services/api.service';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';
import {environment} from './../../../environments/environment'


@Component({
  selector: 'ngx-hospitals-users',
  templateUrl: './hospitals-users.component.html',
  styleUrls: ['./hospitals-users.component.scss']
})
export class HospitalsUsersComponent implements OnInit {
  dtOptions:DataTables.Settings = {};
  userListing:any=[];
  public baseAPi = environment.apiUrl;

  constructor(private apiService:ApiService,private router: Router) { }

  ngOnInit(){
    console.log(this.baseAPi);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
    lengthMenu : [5, 10, 25],
      processing: true
    }
    this.apiService.getHospitalsUserlist().subscribe(res=>{
      console.log(res)
      this.userListing = res['data']
    })
  }

  block(item,i){
    this.apiService.blockUser(item.id).subscribe(res=>{
      console.log(res['success']);
      if(res['success']){
        this.userListing[i].user_status=0
      }
    })
  }
  
  unblock(item,i){
    this.apiService.unBlockUser(item.id).subscribe(res=>{
      console.log(res['success']);
      if(res['success']){
        this.userListing[i].user_status=1
      }
    })
  }

  verifyhospitaldoc(item_id,i,type){
    console.log(item_id)
    this.apiService.verifyhospitaluserdoc(item_id,type).subscribe(res=>{
      if(res['success']){
        // this.userListing[i].user_status=1
        this.userListing[i].admin_verify_status=type
        this.userListing[i].document='';
      }
    })
  }

}
