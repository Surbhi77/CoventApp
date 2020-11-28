import { Component, OnInit } from '@angular/core';
import {ApiService} from  './../../services/api.service';

@Component({
  selector: 'ngx-reviewer-list',
  templateUrl: './reviewer-list.component.html',
  styleUrls: ['./reviewer-list.component.scss']
})
export class ReviewerListComponent implements OnInit {
  dtOptions:DataTables.Settings = {};
  userListing:any=[];
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      processing: true
    }
    this.apiService.getReviewerList().subscribe(res=>{
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
