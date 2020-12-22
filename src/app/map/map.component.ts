import { Component, OnInit, ViewChild } from '@angular/core';
import {
GoogleChartInterface,
} from 'ng2-google-charts';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import {ApiService} from './../services/api.service';

declare var $: any;
declare var google: any;

@Component({
  selector: 'ngx-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  json:any[]=[];
 // lowRiskIcon = ""
  //  json= [{
  //    "latitude":43.8766588,
  //    "longitude":-97.1530225,
  //    "Hospital":"Mayo Clinic, Rochester",
  //    "requirement":"Emergent",
  //    "value":1,
  //    "need":"masks",
  //    "iconUrl":{url:"./assets/images/circle-05.png","scaledSize": {"height": 10, "width": 10}}
     
  //   },
  //   {
  //     "latitude":24.4749673,
  //     "longitude":-90.2057287,
  //     "Hospital":"UChicago Medicine",
  //     "requirement":"High",
  //     "value":3,
  //     "need":"PPE",
  //     "iconUrl":{url:"./assets/images/circle-05.png","scaledSize": {"height": 10, "width": 10}}
  //   },
  //   {
  //     "latitude":39.2967385,
  //     "longitude":-76.5949249,
  //     "Hospital":"Johns Hopkins Hospital",
  //     "requirement":"Low",
  //     "value":4,
  //     "need":"masks",
  //     "iconUrl":{url:"./assets/images/circle-07.png","scaledSize": {"height": 15, "width": 15}}
  //   },
  //   {
  //     "latitude":39.2967385,
  //     "longitude":-76.594609,
  //     "Hospital":"Johns Hopkins Hospital",
  //     "requirement":"Low",
  //     "value":5,
  //     "need":"masks",
  //     "iconUrl":{url:"./assets/images/circle-07.png","scaledSize": {"height": 10, "width": 10}}
  //   },
  //   {
  //     "latitude":34.071494,
  //     "longitude":-118.3829765,
  //     "Hospital":"Cedars-Sinai Medical Center",
  //     "requirement":"Low",
  //     "value":6,
  //     "need":"masks",
  //     "iconUrl":{url:"./assets/images/circle-08.png","scaledSize": {"height": 10, "width": 10}}
  //   }
  // ]
  @ViewChild('mychart ', {static: false}) mychart;
  public geoChart: GoogleChartInterface = {
    chartType: 'GeoChart',
    dataTable: [
      ['Latitude', 'Longitude', 'Label','Value',{type:'string', role:'tooltip', 'p': {'html': true}}]
    ],
    options: {
      colorAxis: {colors: ['#ffc107', '#fd7e14', '#dc3545']},
      backgroundColor: '#9cf',
      datalessRegionColor: '#f8f9fa',
      defaultColor: '#6c757d',
      "tooltip": {
        "isHtml":true,
        "textStyle" : {fontSize : 12},
        "backgroundColor" : '#9cf',
      }
    },

  };
  lat = 38.907192;
  long = -77.036873;
  zoom = 2;
  looped:boolean=false;
  openedWindow: any;
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
  latitude: any;
  longitude: any;
  selectedAddress: boolean;
  items:any[]=[];
  risk:any;
  item:any;
  noResult: boolean=false;
  location:any='';

  constructor(private apiService:ApiService) { }

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

  public handleAddressChange(address: Address) {
    // console.log("called...",address)
    // console.log(address.geometry.location.lat(),address.geometry.location.lng());
    this.latitude = address.geometry.location.lat();
    this.longitude = address.geometry.location.lng();
    this.selectedAddress = true;
    this.search();
  }

  public getAllItemLists(){
    this.apiService.getAllItemLists().subscribe(res=>{
      this.items=res['data'];
    })
  }

  public getMapItems(){
    this.apiService.getAllMapsNeeds().subscribe(res=>{
      console.log(res);
      this.json=res['data'];
      let self = this;
      if(this.json.length){
        this.json.forEach(element=>{
          var arr = [];
          arr.push(+element.latitude);
          arr.push(+element.longitude);
          arr.push(element.hospital_name);
          arr.push(+element.urgency_value);
          arr.push('<div class="tooltipa"><div></div><table class="table" style="font-size: 12px; padding:0 !important;"><tr><td>Requirement</td><td>'+element.urgency_icuneed+'</td><tr><tr><td>Need for</td><td>'+element.item_name+'</td><tr></table></div>');
          self.geoChart.dataTable.push(arr);
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
        this.geoChart.dataTable.length = 1;
        this.looped=false;
        this.noResult=true;
      }
      
      //console.log(this.json)
      //console.log(this.geoChart.dataTable)
      
     
    })
  }

  ngOnInit(): void {
    this.getAllItemLists();
    this.getMapItems()
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("absolute-header");

   // this.geoChart.dataTable.push( ['Latitude', 'Longitude', 'Label','Value',{type:'string', role:'tooltip', 'p': {'html': true}}]);
    // var self=this;
    // this.json.forEach(element => {
    //   var arr=[];
    //   arr.push(element.latitude);
    //   arr.push(element.longitude);
    //   arr.push(element.Hospital);
    //   arr.push(element.value);
    //   arr.push('<p>Requirement: '+element.requirement+'</p><p>Need for: '+element.need+'</p>');
    //   self.geoChart.dataTable.push(arr);
    // });
    // this.looped=true;
    console.log(this.geoChart)
  }

  search(){
    //console.log(this.risk)
   let obj={
    "itemcat_name":this.item,
    "latitude":this.latitude,
    "longitude":this.longitude,
    "urgency_value":this.risk
    };
    this.apiService.searchListing(obj).subscribe(res=>{
      console.log(res);
      //this.looped=false;
      this.json=res['data'];
      let self = this;
      if(this.json.length){
        this.geoChart.dataTable.length = 1;
        console.log(self.geoChart)
        this.json.forEach(element=>{
          var arr = [];
          arr.push(+element.latitude);
          arr.push(+element.longitude);
          arr.push(element.hospital_name);
          arr.push(+element.urgency_value);
          arr.push('<div class="tooltipa"><div></div><table class="table" style="font-size: 12px; padding:0 !important;"><tr><td>Requirement</td><td>'+element.urgency_icuneed+'</td><tr><tr><td>Need for</td><td>'+element.item_name+'</td><tr></table></div>');
          self.geoChart.dataTable.push(arr);
          if(element.urgency_icuneed == "Low Risk"){
            element.iconUrl = {url:'./assets/images/circle-05.png',"scaledSize": {"height": 10, "width": 10}}
          }
          if(element.urgency_icuneed == "Medium Risk"){
            element.iconUrl = {url:'./assets/images/circle-06.png',"scaledSize": {"height": 10, "width": 10}}
          }
          if(element.urgency_icuneed == "High Risk"){
            element.iconUrl = {url:'./assets/images/circle-07.png',"scaledSize": {"height": 10, "width": 10}}
          }
          if(element.urgency_icuneed == "Critical"){
            element.iconUrl = {url:'./assets/images/circle-08.png',"scaledSize": {"height": 10, "width": 10}}
          }
          if(element.urgency_icuneed == "Urgent"){
            element.iconUrl = {url:'./assets/images/circle-10.png',"scaledSize": {"height": 10, "width": 10}}
          }
          if(element.urgency_icuneed == "Emergent"){
            element.iconUrl = {url:'./assets/images/circle-11.png',"scaledSize": {"height": 10, "width": 10}}
          }
        });
        console.log(this.geoChart.dataTable)
        let ccComponent = this.geoChart.component;
        let ccWrapper = ccComponent.wrapper;
  
      //force a redraw
        ccComponent.draw();
        this.looped=true;
        this.noResult=false;
       // this.geoChart.component.draw()
        //this.looped=true;
    
      }else{
        this.geoChart.dataTable.length = 1;
        this.looped=false;
        this.noResult=true;
        //this.geoChart.dataTable.push(['','','','',''])
        // let ccComponent = this.geoChart.component;
        // let ccWrapper = ccComponent.wrapper;
  
      //force a redraw
        //ccComponent.draw();
        //this.getMapItems();
      }
      
    })
  }

  clearFilters(){
    this.risk='';
    this.item='';
    this.latitude='';
    this.longitude='';
    this.location=''
    this.getMapItems()
  }

  ngOnDestroy(){
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove("absolute-header");
  }

}
