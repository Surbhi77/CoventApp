import { Component, OnInit } from '@angular/core';
import {ApiService} from  './../../services/api.service';

@Component({
  selector: 'ngx-hospitals-users',
  templateUrl: './hospitals-users.component.html',
  styleUrls: ['./hospitals-users.component.scss']
})
export class HospitalsUsersComponent implements OnInit {
  dtOptions:DataTables.Settings = {};
  userListing:any=[];

  constructor(private apiService:ApiService) { }

  ngOnInit(){
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
      if(res['success']){
        this.userListing[i].user_status=0
      }
    })
  }

  unblock(item,i){
    this.apiService.unBlockUser(item.id).subscribe(res=>{
      if(res['success']){
        this.userListing[i].user_status=1
      }
    })
  }

}
