import { Component, OnInit } from '@angular/core';
import {ApiService} from  './../../services/api.service';

@Component({
  selector: 'ngx-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.scss']
})
export class MyReviewsComponent implements OnInit {
  dtOptions: any={}
  reviewListing:any=[];

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      processing: true
    }
    let userDetails = JSON.parse(localStorage.getItem("userData"));
    this.apiService.getReviewListing(userDetails.id).subscribe(res=>{
      console.log(res);
      this.reviewListing = res['data']
    })
  }

}
