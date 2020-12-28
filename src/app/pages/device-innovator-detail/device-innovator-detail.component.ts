import { Component, OnInit } from '@angular/core';
import {ApiService} from  './../../services/api.service';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';
import {environment} from 'environments/environment'
@Component({
  selector: 'ngx-device-innovator-detail',
  templateUrl: './device-innovator-detail.component.html',
  styleUrls: ['./device-innovator-detail.component.scss']
})
export class DeviceInnovatorDetailComponent implements OnInit {
  device_id:any;
  device_data:any;
  assetsbasepath:any=environment.imageUrl;
  questions:any=0;
  reviews:any=0;
  avg_review:any=0;
  views:any=0;
  constructor(private apiService:ApiService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      console.log(params);
      if(params && params.id){
        // this.isEditScreen=true

        this.device_id= params.id;
        
        this.apiService.getDeviceInnovatorDetail(this.device_id).subscribe(res=>{
          if(res['success']){
            this.device_data = res['data'][0]
            console.log(this.device_data);
            this.getViews();
            this.getReviews();
            this.getQuestions();
          }
        });
      }
      // console.log(this.hospital_id)
      // this.orderId = params.id;
      // this.getOrderDetails()
    })
    // getDeviceInnovatorDetail
  }
  
  
  getQuestions() {
    //throw new Error("Method not implemented.");
    this.apiService.getQuestionbyInnovation(this.device_id).subscribe(res=>{
      if(res['success']){
        this.questions = res['data'].length
      }else{
        this.questions=0;
      }
    },error=>{
      this.questions=0;
    })
  }

  getReviews() {
    this.apiService.getReviewsbyInnovation(this.device_id).subscribe(res=>{
      if(res['success']){
        this.reviews = res['data'].length;
        let avg_review = 0;
        res['data'].forEach(element => {
          avg_review = avg_review+element.ratings
        });
        this.avg_review = avg_review
      }else{
        this.reviews=0;
        this.avg_review=0;
      }
    },error=>{
      this.reviews=0;
      this.avg_review=0;
    })
  }

  getViews() {
    this.apiService.getViewsbyInnovation(this.device_id).subscribe(res=>{
      console.log(res)
      if(res['success']){
        this.views = res['data'].length
      }else{
        this.views=0;
      }
    },error=>{
      this.views=0;
    })
  }

}
