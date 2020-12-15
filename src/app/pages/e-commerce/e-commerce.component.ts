import { Component } from '@angular/core';
import {ApiService} from './../../services/api.service';
import { Chart } from 'angular-highcharts';
import * as Highcharts from "highcharts";

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.scss']
})
export class ECommerceComponent {
  deviceListing: any=[];
  baseUrl:any='http://134.209.68.96/frontend/';
  topViewedListing: any;
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
      // text: 'Monthly Added'
      text: ''
    },
    series: [
      
      {type:'column',
        data: [1, 2, 3, 6, 9],
        color: '#13bfb3'
      }
    ],
    exporting: {
      enabled: true
    },
    yAxis: {
      min:0,
      allowDecimals: false,
      title: {
        text: "Data"
      }
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  };
  chartOptions2 = {
    title: {
     // text: 'Monthly Views'
     text:''
    },
    series: [
      
      {type:'column',
        data: [1, 2, 3, 6, 9],
        color: '#13bfb3'

      }
    ],
    exporting: {
      enabled: true
    },
    yAxis: {
      min:0,
      allowDecimals: false,
      title: {
        text: "Data"
      }
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  };
  monthlyData: any=[];
  monthlyReviewData: any=[];
  monthlyViewedData: any;

  constructor(private apiService:ApiService){
    const self = this;

    this.chartCallback = chart => {
      self.chart = chart;
    };
    this.chartCallback2 = chart2 => {
      self.chart2 = chart2;
    }
  }

  ngOnInit(){
    this.getLatestInnovator();
    this.getLatestViewInnovator();
    this.getMonthlyCount();
    this.getViewedCount()
  }

  getViewedCount(){
    this.apiService.monthlyViewedCount().subscribe(res=>{
      console.log(res);
      this.monthlyViewedData = res['data'];
      let series=[];
      let values=[];
      this.monthlyViewedData.forEach(element => {
        series.push(element.counts);
        values.push(element.month)
      });
      this.chartOptions2.series[0].data = series;
      this.chartOptions2.xAxis.categories = values;
      this.updateFlag2=true
    })
  }

  getMonthlyCount() {
    this.apiService.monthlyAddedCount().subscribe(res=>{
      console.log(res);
      this.monthlyData = res['data'];
      let series = [];
      let values=[];
      console.log(series)
      this.monthlyData.forEach(element => {
        //console.log(element);
        series.push(element.counts);
        values.push(element.month)
      });
      console.log(series)
      this.chartOptions.series[0].data = series;
      this.chartOptions.xAxis.categories = values;
      this.updateFlag=true
    })
  }

  getLatestInnovator() {
    this.apiService.getLatestInnovator().subscribe(res=>{
      console.log(res);
      this.deviceListing=res['data'];

    })
  }

  getLatestViewInnovator(){
    this.apiService.getLatestViewInnovator().subscribe(res=>{
      console.log(res);
      this.topViewedListing=res['data']
    })
  }


  openDetail(item){
   console.log(this.baseUrl+'library-details/'+item.device_data_id);
   window.open(this.baseUrl+'library-details/'+item.device_data_id,"_blank")
  }
}
