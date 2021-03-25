import { Component, OnInit, ViewChild } from '@angular/core';
import {
GoogleChartInterface,
} from 'ng2-google-charts';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import {environment} from 'environments/environment';
import {ApiService} from './../services/api.service';

declare var $: any;
declare var google: any;
declare const anychart: any;
@Component({
  selector: 'ngx-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  public baseAPi = environment.apiUrl;
  json:any[]=[];
  itemIcuNeedonmap:any[];
  recentlyIcuNeed:any=[];
  globalCount:any[];
  category_data:boolean=false;
  allitemdata:boolean=true;
  mapContent:any;
  totalcount  = 0;
  getDeviceCategoryListData:any[];
  selectedcategory_id:0;
  innovationData: any=[];
  currentRate: any;

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
  risk:any=0;
  item:any=0;
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
          arr.push('Need for '+element.item_name);
          arr.push(+element.urgency_value);
          arr.push('<div class="tooltipa"><div></div><table class="table" style="font-size: 12px; padding:0 !important;"><tr><td>Requirement</td><td>'+element.urgency_icuneed+'</td><tr></table></div>');
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
    this.datafilterbycat(0);
    this.getRecentlyIcuNeed();
    this.getDeviceCategoryList();
    this.getIcuNeedDataonmap(0);
    this.getMapJson();
    // this.newbubblemap()
    this.getInnovationAll()
    console.log(this.geoChart)
  }


  getIcuNeedDataonmap(catid){
    this.apiService.getIcuNeedDataonmap(catid).subscribe(res=>{
      console.log(res);
      this.totalcount = 0;

      this.itemIcuNeedonmap =res['data'];
      for (var val of res['data']) {
        this.totalcount +=parseInt(val.device_need_perday)
        console.log('val',parseInt(val.device_need_perday)); // prints values: 10, 20, 30, 40
      }
      console.log('totalcount',this.totalcount);
    })
  }

  getRecentlyIcuNeed(){
    this.apiService.getRecentlyIcuNeedService().subscribe(res=>{
      console.log(res);
      let index = 0;
      let recentarr = [];
      console.log('resresres',res['data']);
      res['data'].forEach(function(valuearr){
        valuearr.forEach(function(val){
        recentarr[index] = val;
        index++
        });
      });
      this.recentlyIcuNeed = recentarr;
      // this.recentlyIcuNeed = res['data']


    })
  }

  getDeviceCategoryList(){

    // this.apiService.getDeviceListing().subscribe(res=>{
    this.apiService.hospitalCategoryListing().subscribe(res=>{
      console.log('hospitalCategoryListing',res);
      this.getDeviceCategoryListData =res['data'];
      // for (var val of res['data']) {
      //   this.recentlyIcuNeed += parseInt(val.device_need_perday); // prints values: 10, 20, 30, 40
      // }
    })
  }

  getMapJson(){
    this.apiService.getDataOnmap().subscribe(res=>{
      console.log('getDataOnmap',res);
      // this.mapContent =res['data']
      // console.log(this.teamContent.length)
    })
  }

  getInnovationAll(){
    let obj:any = {}
      obj.limit=6
   // this.apiService.getInnovation(6,1,2,2).subscribe((res:any)=>{
    this.apiService.getInnovation(obj).subscribe((res:any)=>{
      this.innovationData = res.data;
    console.log("Innovation data............",this.innovationData)
    })
    this.innovationData.forEach(element => {
      element.ratings = this.currentRate

    });
  }


  datafilterbycat(eventid){
    console.log('eventid',eventid);
    this.getIcuNeedDataonmap(eventid)
    this.selectedcategory_id=eventid
    // document.getElementById('container_mapcategory').removeChild();
    var container_mapcategory = document.getElementsByClassName("container_mapcategory");
    // container_mapcategory.html('');
    // console.log('container_mapcategory',container_mapcategory.innerHTML = 'asdasdasd');
    // container_mapcategory.HTMLCollectionOf = "I am changed by ElementRef & ViewChild";
    // document.getElementById('container_mapcategory').html('')
    // this.category_data=true;
    // this.allitemdata=false;
    let jsonfileurl = environment.apiUrl+'/categoryitemallrequiredmap.json';
    if(eventid==0){
      jsonfileurl = environment.apiUrl+'/itemallrequiredmap.json'
    }
      this.apiService.getdatabycatonmap(eventid).subscribe(res=>{
        console.log('getDataOnmap',res);
        anychart.onDocumentReady(function () {
          anychart.data.loadJsonFile(
            // '/assets/map/worldmap.json',
            jsonfileurl,
            function (data) {

              // Creates map chart
              var map = anychart.map();
              map.background().fill("#fff");
              // Define settings for maps regions
              map
                .unboundRegions()
                .enabled(true)
                .fill('#00c4ce')
                .stroke('#5D5269');


              // Set geodata using the script added
              map.geoData(anychart.maps['world']);

              map.interactivity().selectionMode('none');
              map.padding(0);

              // var dataSet = anychart.data.set(data);
              // var densityData = dataSet.mapAs({ size: 'population' });
              // var series = map.bubble(densityData);

              var zoom = anychart.ui.zoom();
              zoom.target(map);
              // Set Chart Title
              map
                .title('COVID-19 ESSENTIAL SUPPLIES DASHBOARD');

              // Set bubble min/max size settings
              map.minBubbleSize('0.5%').maxBubbleSize('2%');

              // Fill color based on the winner
              data.forEach(function(d){
                if(d.winner == "Democrats"){
                  d.fill = "#C00808";
                }else{
                  d.fill = "#C00808";
                }
              });

              map
                .tooltip()
                .useHtml(true)
                .format(function () {
                  return (
                    // '<span style="color: #d9d9d9">In Use</span>: ' +
                    // parseFloat(this.getData('votepercent')).toLocaleString() +
                    // '  <br/>' +
                    '<span style="color: #d9d9d9">Required</span>: ' +
                    parseInt(this.getData('device_need_perday')).toLocaleString() +
                    '<br/>'
                    // '<span style="color: #d9d9d9">Required</span>: ' +
                    // parseInt(this.getData('area')).toLocaleString() +
                    // ' '
                  );
                });

              //Charting the bubbles
              var series = map.bubble(
                anychart.data.set(data).mapAs({ size: 'device_need_perday' })
              );

              // Tooltip
              series
                .tooltip(true)
                .stroke('1976d2')
                .fill('#1976d2')
                .selectionMode('none');

              // Labels
              series
                .labels()
                .enabled(true)
                .anchor('left-center')
                .position('right')
                .fontSize(11)
                .offsetX(5);

              document.getElementById('container_mapcategory').innerHTML = '';
              // Set container id for the chart
              map.container('container_mapcategory');
              // Initiates chart drawing
              // map.remove();
              map.draw();
              // map.baseLayer().redraw();

              var controllerContainercat = document.createElement('div');
              //controllerContainer.style.cssText = 'background-color: #FFECB3; padding: 5px;';
              controllerContainercat.setAttribute('id', 'controller_container');


              document.getElementById('container_mapcategory').appendChild(controllerContainercat);

              // const p: HTMLParagraphElement = this.renderer.createElement('p');
              // p.innerHTML = "add new"
              // this.renderer.appendChild(controllerContainer)

              // Renders the zoom controller into container.
              zoom.decorate(controllerContainercat);

          });
        });
        // this.mapContent =res['data']
        // console.log(this.teamContent.length)
      })

  }

  bubblemap(){

    this.category_data=false;
    this.allitemdata=true;
    this.getIcuNeedDataonmap(0)
    anychart.onDocumentReady(function () {
      anychart.data.loadJsonFile(
        // '/assets/map/worldmap.json',
        environment.apiUrl+'/itemallrequiredmap.json',
        function (data) {

          // Creates map chart
          var map = anychart.map();
          map.background().fill("##000F1A");
          // Define settings for maps regions
          map
            .unboundRegions()
            .enabled(true)
            .fill('#2A2A28')
            .stroke('#5D5269');


          // Set geodata using the script added
          map.geoData(anychart.maps['world']);

          map.interactivity().selectionMode('none');
          map.padding(0);

          // var dataSet = anychart.data.set(data);
          // var densityData = dataSet.mapAs({ size: 'population' });
          // var series = map.bubble(densityData);

          var zoom = anychart.ui.zoom();
          zoom.target(map);
          // Set Chart Title
          map
            .title('COVID-19 ESSENTIAL SUPPLIES DASHBOARD');

          // Set bubble min/max size settings
          map.minBubbleSize('0.5%').maxBubbleSize('2%');

          // Fill color based on the winner
          data.forEach(function(d){
            if(d.winner == "Democrats"){
              d.fill = "#C00808";
            }else{
              d.fill = "#C00808";
            }
          });

          map
            .tooltip()
            .useHtml(true)
            .format(function () {
              return (
                // '<span style="color: #d9d9d9">In Use</span>: ' +
                // parseFloat(this.getData('votepercent')).toLocaleString() +
                // '  <br/>' +
                '<span style="color: #d9d9d9">Required</span>: ' +
                parseInt(this.getData('device_need_perday')).toLocaleString() +
                '<br/>'
                // '<span style="color: #d9d9d9">Required</span>: ' +
                // parseInt(this.getData('area')).toLocaleString() +
                // ' '
              );
            });

          //Charting the bubbles
          var series = map.bubble(
            anychart.data.set(data).mapAs({ size: 'device_need_perday' })
          );

          // Tooltip
          series
            .tooltip(true)
            .stroke('1976d2')
            .fill('#1976d2')
            .selectionMode('none');

          // Labels
          series
            .labels()
            .enabled(true)
            .anchor('left-center')
            .position('right')
            .fontSize(11)
            .offsetX(5);

          // Set container id for the chart
          map.container('container');

          // Initiates chart drawing
          map.draw();

          var controllerContainer = document.createElement('div');
          //controllerContainer.style.cssText = 'background-color: #FFECB3; padding: 5px;';
          controllerContainer.setAttribute('id', 'controller_container');

          document.getElementById('container').appendChild(controllerContainer);

          // const p: HTMLParagraphElement = this.renderer.createElement('p');
          // p.innerHTML = "add new"
          // this.renderer.appendChild(controllerContainer)

          // Renders the zoom controller into container.
          zoom.decorate(controllerContainer);

      });
    });
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
    this.risk=0;
    this.item=0;
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
