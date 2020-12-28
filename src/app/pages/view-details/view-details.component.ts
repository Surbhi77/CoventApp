import { Component, OnInit } from '@angular/core';
import {ApiService} from  './../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import {environment} from 'environments/environment'

@Component({
  selector: 'ngx-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {
  innovationId:any;
  device_data: any;
  assetsbasepath:any=environment.imageUrl;
  views: any=0;
  reviews: any=0;
  questions: any=0;
  avg_review: number;

  constructor( private router: Router,
    private route: ActivatedRoute,
    private apiService:ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      if(params && params.innovator_id){
        this.innovationId = params.innovator_id;
        this.getDetails();
        this.getViews();
        this.getReviews();
        this.getQuestions();
      }
    })
  }

  getQuestions() {
    //throw new Error("Method not implemented.");
    this.apiService.getQuestionbyInnovation(this.innovationId).subscribe(res=>{
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
    this.apiService.getReviewsbyInnovation(this.innovationId).subscribe(res=>{
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
    this.apiService.getViewsbyInnovation(this.innovationId).subscribe(res=>{
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

  getDetails() {
    this.apiService.getDeviceDetail(this.innovationId).subscribe(res=>{
      if(res['success']){
        this.device_data = res['data'][0]
        console.log(this.device_data);
      }
    });
  }

  onDeleteConfirm(): void {
    console.log(event)
    if(window.confirm('Are you sure you want to delete')) {
      this.apiService.deleteDevice(this.innovationId).subscribe(res=>{
        if(res['success']){

         this.router.navigateByUrl('/pages/data-listing')
        // this.source.update(this.deviceListing,newArr)
          //this.source.refresh()
          //event.confirm.resolve();
        }
      })
    }
  }

}
