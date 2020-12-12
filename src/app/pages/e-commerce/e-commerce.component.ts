import { Component } from '@angular/core';
import {ApiService} from './../../services/api.service'

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent {
  userDetails: any;
  questionCount: any;
  noOfstarRating: any;
  noOfDeviceViews: any;
  options = {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Counters',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220],
      },
    ],
  };

  constructor(private apiService:ApiService) {
    
  }

  ngOnInit(){
    let userDetails = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = userDetails;
    this.getDeviceViews();
    this.getReviewsRecieved();
    this.getStarRatings();
    this.questionsRecieved()
  }

  questionsRecieved() {
    this.apiService.getQuestionCountUserWise(this.userDetails.id).subscribe(res=>{
     // console.log(res);
      this.questionCount = res['data'].questioncount
    })
  }

  getStarRatings() {
    this.apiService.getAvgRatings(this.userDetails.id).subscribe(res=>{
      console.log(res);
      this.getStarRatings = res['data'].rating
    })
  }

  getReviewsRecieved() {
    this.apiService.getStarRatings(this.userDetails.id).subscribe(res=>{
      console.log(res);
      this.noOfstarRating = res['data'].ratings
    })
  }

  getDeviceViews() {
   this.apiService.getDeviceViews(this.userDetails.id).subscribe(res=>{
     this.noOfDeviceViews = res['data'].viewcount
   })
  }

  ngOnDestroy() {
    
  }
  
}
