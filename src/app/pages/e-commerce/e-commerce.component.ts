import { Component } from '@angular/core';
import {ApiService} from './../../services/api.service';
import { Chart } from 'angular-highcharts';
import * as Highcharts from "highcharts";
import { DatePipe } from '@angular/common'

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
  chartCallback3;
  chartCallback4;
  chart;
  chart2;
  chart3;
  chart4;
  updateFlag = false;
  updateFlag2=false;
  updateFlag3=false;
  updateFlag4=false;
  latestAddedItems:any;
  lat = 38.907192;
  long = -77.036873;
  zoom = 2;
  chartOptions = {
    title: {
      // text: 'Monthly Added'
      text: ''
    },
    series: [   
      {
        type:'column',
        name:'Total add',
        showInLegend:false,
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
        text: "Device Added"
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
      {
        type:'column',
        name:'Total view',
        showInLegend:false,
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
        text: "Views"
      }
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  };

  chartOptions3 = {
    title: {
      // text: 'Monthly Added'
      text: ''
    },
    series: [   
      {
        type:'column',
        name:'Total need',
        showInLegend:false,
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
        text: "No. Of Items Submitted"
      }
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
  };

  chartOptions4 = {
    title: {
      // text: 'Monthly Added'
      text: ''
    },
    series: [   
      {
        type:'column',
        name:'Total need',
        showInLegend:false,
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
        text: "No. Of Items Submitted"
      }
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
  };

  monthlyData: any=[];
  monthlyReviewData: any=[];
  monthlyViewedData: any;
  date:any;
  json:any[]=[];
  looped: boolean=false;
  openedWindow: any;

  constructor(private apiService:ApiService,public datepipe: DatePipe){
    const self = this;
    
    this.chartCallback = chart => {
      self.chart = chart;
    };
    this.chartCallback2 = chart2 => {
      self.chart2 = chart2;
    }
    this.chartCallback3 = chart3 => {
      self.chart3 = chart3;
    }
    this.chartCallback4 = chart4 => {
      self.chart4 = chart4;
    }
  }

  ngOnInit(){
    this.getLatestInnovator();
    this.getLatestViewInnovator();
    this.getMonthlyCount();
    this.getViewedCount()
    this.getLatestAddedItems();
    this.getmonthlyItems();
    this.getweeklyItems();
    this.getMapItems()
    this.date=new Date();
    let latest_date =this.datepipe.transform(this.date, 'EEEE');
    // console.log(latest_date)
  }

  isInfoWindowOpen(hospitalName) {
    return this.openedWindow == hospitalName; // alternative: check if id is in array
  }

  onMouseOver(infoWindow, $event: MouseEvent) {
    infoWindow.open();
  }

  onMouseOut(infoWindow, $event: MouseEvent) {
      infoWindow.close();
  }

  openWindow(id) {
    this.openedWindow = id; // alternative: push to array of numbers
  }

  getMapItems() {
    //throw new Error("Method not implemented.");
    this.apiService.getAllMapsNeeds().subscribe(res=>{
      console.log(res);
      this.json=res['data'];
      let self = this;
      if(this.json.length){
        this.json.forEach(element=>{
          var arr = [];
          arr.push(+element.latitude);
          arr.push(+element.longitude);
          arr.push('Need for '+element.item_name);
          arr.push(+element.urgency_value);
          arr.push('<div class="tooltipa"><div></div><table class="table" style="font-size: 12px; padding:0 !important;"><tr><td>Requirement</td><td>'+element.urgency_icuneed+'</td><tr></table></div>');
          //self.geoChart.dataTable.push(arr);
          if(element.urgency_icuneed == "Low Risk"){
            element.iconUrl = {url:'./assets/images/circle-10.png',"scaledSize": {"height": 10, "width": 10}}
          }
          if(element.urgency_icuneed == "Medium Risk"){
            element.iconUrl = {url:'./assets/images/circle-07.png',"scaledSize": {"height": 10, "width": 10}}
          }
          if(element.urgency_icuneed == "High Risk"){
            element.iconUrl = {url:'./assets/images/circle-06.png',"scaledSize": {"height": 10, "width": 10}}
          }
          if(element.urgency_icuneed == "Critical"){
            element.iconUrl = {url:'./assets/images/circle-05.png',"scaledSize": {"height": 10, "width": 10}}
          }
          if(element.urgency_icuneed == "Urgent"){
            element.iconUrl = {url:'./assets/images/circle-05.png',"scaledSize": {"height": 10, "width": 10}}
          }
          if(element.urgency_icuneed == "Emergent"){
            element.iconUrl = {url:'./assets/images/circle-05.png',"scaledSize": {"height": 10, "width": 10}}
          }
        });
        this.looped=true;
      }else{
      //  this.geoChart.dataTable.length = 1;
        this.looped=false;
        //this.noResult=true;
      }
      
      //console.log(this.json)
      //console.log(this.geoChart.dataTable)
      
     
    })
  }

  getLatestAddedItems(){
    this.apiService.latestAddItems().subscribe(res=>{
      console.log(res);
      this.latestAddedItems=res['data']
    })
  }
  getmonthlyItems(){
    this.apiService.monthlyItemsgraph().subscribe(res=>{
      console.log(res);
      // this.latestAddedItems=res['data']
      this.monthlyViewedData = res['data'];
      let series=[];
      let values=[];
      this.monthlyViewedData.forEach(element => {
        series.push(element.counts);
        values.push(this.datepipe.transform(element.month, 'MMM'))
      });
      this.chartOptions3.series[0].data = series;
      this.chartOptions3.xAxis.categories = values;
      this.updateFlag3=true
    })
  }
  getweeklyItems(){
    this.apiService.weeklyItemsgraph().subscribe(res=>{
      console.log(res);
      // this.latestAddedItems=res['data']
      this.monthlyViewedData = res['data'];
      let series=[];
      let values=[];
      this.monthlyViewedData.forEach(element => {
        series.push(element.counts);
        values.push(this.datepipe.transform(element.date, 'dd-EEE'))
      });
      this.chartOptions4.series[0].data = series;
      this.chartOptions4.xAxis.categories = values;
      this.updateFlag4=true
    })
  }

  getViewedCount(){
    this.apiService.monthlyViewedCount().subscribe(res=>{
      console.log(res);
      this.monthlyViewedData = res['data'];
      let series=[];
      let values=[];
      this.monthlyViewedData.forEach(element => {
        series.push(element.counts);
        values.push(this.datepipe.transform(element.month, 'MMM'))
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
        values.push(this.datepipe.transform(element.month, 'MMM'))
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
      console.log('res===');
      this.topViewedListing=res['data']
    })
  }



  openDetail(item){
   console.log(this.baseUrl+'library-details/'+item.device_data_id);
   window.open(this.baseUrl+'library-details/'+item.device_data_id,"_blank")
  }


  


}
