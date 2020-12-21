import { Component, OnInit } from '@angular/core';
import {ApiService} from './../services/api.service'
import { Router } from '@angular/router';
import {environment} from 'environments/environment';
import {
  GoogleChartInterface,

} from 'ng2-google-charts';
@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredInnovatorListing:any=[];
  featuredCategories:any=[];
  assetUrl:any=environment.imageUrl;
  json= [{
    "latitude":43.8766588,
    "longitude":-97.1530225,
    "Hospital":"Mayo Clinic, Rochester",
    "requirement":"Emergent",
    "value":1,
    "need":"masks",
    "iconUrl":{url:"/assets/images/circle-05.png","scaledSize": {"height": 10, "width": 10}}
    
   },
   {
     "latitude":24.4749673,
     "longitude":-90.2057287,
     "Hospital":"UChicago Medicine",
     "requirement":"High",
     "value":3,
     "need":"PPE",
     "iconUrl":{url:"/assets/images/circle-05.png","scaledSize": {"height": 10, "width": 10}}
   },
   {
     "latitude":39.2967385,
     "longitude":-76.5949249,
     "Hospital":"Johns Hopkins Hospital",
     "requirement":"Low",
     "value":4,
     "need":"masks",
     "iconUrl":{url:"/assets/images/circle-05.png","scaledSize": {"height": 15, "width": 15}}
   },
   {
     "latitude":39.2967385,
     "longitude":-76.594609,
     "Hospital":"Johns Hopkins Hospital",
     "requirement":"Low",
     "value":5,
     "need":"masks",
     "iconUrl":{url:"/assets/images/circle-05.png","scaledSize": {"height": 10, "width": 10}}
   },
   {
     "latitude":34.071494,
     "longitude":-118.3829765,
     "Hospital":"Cedars-Sinai Medical Center",
     "requirement":"Low",
     "value":6,
     "need":"masks",
     "iconUrl":{url:"/assets/images/circle-05.png","scaledSize": {"height": 10, "width": 10}}
   }
 ]
 looped:boolean=false;

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
        "isHtml":true
      }
    }
  };
  constructor(private apiService:ApiService,private router:Router) { }

  ngOnInit(): void {
   var self=this;
    this.json.forEach(element => {
      var arr=[];
      arr.push(element.latitude);
      arr.push(element.longitude);
      arr.push(element.Hospital);
      arr.push(element.value);
      arr.push('<p>Requirement: '+element.requirement+'</p><p>Need for: '+element.need+'</p>');
      self.geoChart.dataTable.push(arr);
    });
    this.looped=true;
    let body = document.getElementsByTagName('body')[0];
        body.classList.remove("nb-theme-material-light");
    this.getAllFeaturedData();
    this.getAllFeaturedCategories();
  }

  getAllFeaturedData() {
   this.apiService.getFeaturedInnovationListing().subscribe(res=>{
     console.log(res);
     this.featuredInnovatorListing=res['data']
   }) 
  }

  getAllFeaturedCategories(){
    this.apiService.getFeaturedCategories().subscribe(res=>{
      console.log(res);
      this.featuredCategories =res['data']
    })
  }

  navigateToCategory(item){
    //alert("here")
    this.router.navigateByUrl('/innovator-listing/'+item.category_id)
  }

  navigateToDetail(item){
    this.router.navigateByUrl('/library-details/'+item.device_data_id)
  }

}
