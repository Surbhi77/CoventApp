import { Component } from '@angular/core';
import {ApiService} from './../../services/api.service'
import * as moment from 'moment'; // add this 1 of 4
import * as Highcharts from "highcharts";
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.scss']
})
export class ECommerceComponent {
  userDetails: any;
  questionCount: any;
  noOfstarRating: any;
  noOfDeviceViews: any;
  Highcharts = Highcharts;
  chartConstructor = "chart";
  chartCallback;
  chartCallback2;
  chart;
  chart2;
  updateFlag = false;
  updateFlag2=false;
  chartOptions = {
    title: {
      text: ''
      // text: 'Weekly Review'
    },
    series: [
      
      {
       type:'column',
       showInLegend:false,
       color: '#13bfb3',
       data: [1, 2, 3, 6, 9]
      }
    ],
    exporting: {
      enabled: true
    },
    yAxis: {
      min:0,
      allowDecimals: false,
      title: {
        text: "Reviews"
        // text: ""
      }
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  };
  chartOptions2 = {
    title: {
      // text: 'Weekly Views'
      text: ''
    },
    series: [     
      {
        type:'column',
        color: '#13bfb3',
        showInLegend:false,
        data: [1, 2, 3, 6, 9]
      }
    ],
    exporting: {
      enabled: true
    },
    yAxis: {
      min:0,
      allowDecimals: false,
      title: {
        text: "Views"
      }
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  };
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
        data: [],
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
  getStarRating: any;
  userType:any;

  constructor(private apiService:ApiService,private router:Router) {
    this.chartCallback = chart => {
      this.chart = chart;
    };
    this.chartCallback2 = chart2 => {
      this.chart2 = chart2;
    }; 
  }

  ngOnInit(){
    let userDetails = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = userDetails;
    this.userType = userDetails.user_type
    if(this.userDetails.user_type == 2){
      this.router.navigateByUrl('/pages/review-list')
    }
    this.getDeviceViews();
    this.getReviewsRecieved();
    this.getStarRatings();
    this.questionsRecieved();
    this.weeklyReview();
    this.weeklyView()
  }

  weeklyView(){
    this.apiService.getWeeklyViews(this.userDetails.id).subscribe(res=>{
      console.log(res);
      let records = res['data']
      let series=[];
      let category=[];
      records.forEach(element => {
        series.push(element.counts);
        category.push(moment(element.date).format('ddd'))
      });
      console.log(series,category);
      this.chartOptions2.xAxis.categories = category
      this.chartOptions2.series[0].data = series
      this.updateFlag2=true
    })
  }

  weeklyReview(){
    this.apiService.getWeeklyReview(this.userDetails.id).subscribe(res=>{
      console.log(res);
      let records = res['data']
      let series=[];
      let category=[];
      records.forEach(element => {
        series.push(element.counts);
        category.push(moment(element.date).format('ddd'))
      });
      console.log(series,category);
      this.chartOptions.xAxis.categories = category
      this.chartOptions.series[0].data = series
      this.updateFlag=true
    })
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
      this.getStarRating = res['data'].rating
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
