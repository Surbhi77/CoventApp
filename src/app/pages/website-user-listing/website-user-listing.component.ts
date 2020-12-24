import { Component } from '@angular/core';

import {ApiService} from  './../../services/api.service';

@Component({
  selector: 'ngx-website-user-listing',
  templateUrl: './website-user-listing.component.html',
  styleUrls: ['./website-user-listing.component.scss']
})
export class WebsiteUserListingComponent {
  dtOptions:DataTables.Settings = {};
  userListing:any=[];

  constructor(private apiService:ApiService) {
  
  }

  ngOnInit(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
    lengthMenu : [5, 10, 25],
      processing: true
    }
    this.apiService.getUserInnovatorList().subscribe(res=>{
      console.log('list',res)
      this.userListing = res['data']
    })
  }

  // onDeleteConfirm(event): void {
  //   if (window.confirm('Are you sure you want to delete?')) {
  //     event.confirm.resolve();
  //   } else {
  //     event.confirm.reject();
  //   }
  // }

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
