import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import {ApiService} from './../services/api.service'
import { ActivatedRoute, Router } from '@angular/router';
import {environment} from 'environments/environment';
import {
  GoogleChartInterface,

} from 'ng2-google-charts';
declare const anychart: any;
@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('div') div: ElementRef;

  public baseAPi = environment.apiUrl;
  totalcount  = 0;
  selectedcategory_id:0;
  category_data:boolean=false;
  allitemdata:boolean=true;
  mapContent:any;
  getDeviceCategoryListData:any[];
  itemIcuNeedonmap:any[];
  recentlyIcuNeed:any=[];
  globalCount:any[];
  featuredInnovatorListing:any=[];
  featuredCategories:any=[];
  teamContent:any=[];
  sliderContent:any=[];
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
  deviceDetails: any=[];
  categoryId: any;
  constructor(private apiService:ApiService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getDeviceDetails()
   var self=this;
    this.json.forEach(element => {
      var arr=[];
      arr.push(element.latitude);
      arr.push(element.longitude);
      arr.push('Need for '+element.need);
      arr.push(element.value);
      arr.push('<div class="tooltipa"><div></div><table class="table" style="font-size: 12px; padding:0 !important;"><tr><td>Requirement</td><td>'+element.requirement+'</td><tr></table></div>');
      self.geoChart.dataTable.push(arr);
    });
    this.looped=true;
    let body = document.getElementsByTagName('body')[0];
        body.classList.remove("nb-theme-material-light");
    this.getAllFeaturedData();
    this.getAllFeaturedCategories();
    this.getSlider() // this by #as becouze table not found
    this.getTeam(); // this by #as becouze table not found
    // this.bubblemap();
    this.datafilterbycat(0);
    // this.newbubblemap()
    this.getRecentlyIcuNeed();
    this.getDeviceCategoryList();
    this.getIcuNeedDataonmap(0);
    this.getMapJson();

    console.log('baseAPi',this.baseAPi);
  }

  getAllFeaturedData() {
   this.apiService.getFeaturedInnovationListing().subscribe(res=>{
     console.log('featuredInnovatorListing',res);
     this.featuredInnovatorListing=res['data']
   })
  }


  getDeviceDetails(){
    let obj={
      category_id:this.categoryId
    }
    this.categoryId = this.route.snapshot.params['id']
    console.log(this.categoryId)
    this.apiService.getInnovatorDetail(this.categoryId).subscribe(res=>{
      console.log("jhjygyhg",res)
      if(res['success']){
        this.deviceDetails =  res['data'][0];
        this.deviceDetails.team_member = JSON.parse(res['data'][0].team_member);
        // this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.deviceDetails.device_videos);
        // this.safeHtml = this._sanitizer.bypassSecurityTrustHtml(this.deviceDetails.device_videos)
      }
    })
  }
  getAllFeaturedCategories(){
    this.apiService.getFeaturedCategories().subscribe(res=>{
      console.log(res);
      this.featuredCategories =res['data']
    })
  }

  getRecentlyIcuNeed(){
    this.apiService.getRecentlyIcuNeedService().subscribe(res=>{
      console.log(res);
      let index = 0;
      // let recentarr = [];
      // for (let valuearr of res['data']) {
      //   for (let val of valuearr) {

      //   console.log('val',val);
      //   recentarr[index] = val;
      //   index++
      //   }
      // }
      // console.log('recentarr',recentarr);
      this.recentlyIcuNeed = res['data']
      //res['data'];

    })
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



  getSlider(){
    this.apiService.sliderlistData().subscribe(res=>{
      console.log(res);
      this.sliderContent =res['data']
      console.log(this.sliderContent.length)
    })
  }

  getTeam(){
    this.apiService.teamlistData().subscribe(res=>{
      console.log(res);
      this.teamContent =res['data']
      console.log(this.teamContent.length)
    })
  }

  getMapJson(){
    this.apiService.getDataOnmap().subscribe(res=>{
      console.log('getDataOnmap',res);
      // this.mapContent =res['data']
      // console.log(this.teamContent.length)
    })
  }

  navigateToCategory(item){
    //alert("here")
    this.router.navigateByUrl('/innovator-listing/'+item.category_id)
  }

  navigateToDetail(item){
    this.router.navigateByUrl('/library-details/'+item.device_data_id)
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


  newbubblemap(){
    anychart.onDocumentReady(function () {
      // The data used in this sample can be obtained from the CDN
      // https://cdn.anychart.com/samples/maps-general-features/world-bubble-map/data.json
      anychart.data.loadJsonFile(
        'https://cdn.anychart.com/samples/maps-general-features/world-bubble-map/data.json',
        function (data) {
          var map = anychart.map();
          map
            .credits()
            .enabled(true)
            .url(
              'https://en.wikipedia.org/wiki/List_of_sovereign_states_and_dependent_territories_by_population_density'
            )
            .logoSrc('https://en.wikipedia.org/static/favicon/wikipedia.ico')
            .text(
              'Data source: https://en.wikipedia.org/wiki/List_of_sovereign_states_and_dependent_territories_by_population_density'
            );

          map
            .title()
            .enabled(true)
            .useHtml(true)
            .padding([10, 0, 10, 0])
            .text(
              'Worlds Population by Country<br/>' +
              '<span  style="color:#929292; font-size: 12px;">' +
              '(Data was collected from Wikipedia, 2015)</span>'
            );

          map.geoData('anychart.maps.world');

          map.interactivity().selectionMode('none');
          map.padding(0);

          var dataSet = anychart.data.set(data);
          var densityData = dataSet.mapAs({ size: 'population' });
          var series = map.bubble(densityData);

          // set chart bubble settings
          map.maxBubbleSize('7%').minBubbleSize('0.3%');

          series.labels(false).selectionMode('none');

          var choropleth = map.choropleth(densityData);
          choropleth
            .selectionMode('none')
            .fill('#eaeaea')
            .stroke('#D2D2D2')
            .labels(false);

          choropleth.hovered().stroke('#eaeaea').fill('#D2D2D2');

          map
            .tooltip()
            .useHtml(true)
            .format(function () {
              return (
                '<span style="color: #d9d9d9">Density</span>: ' +
                parseFloat(this.getData('density')).toLocaleString() +
                ' pop./km² <br/>' +
                '<span style="color: #d9d9d9">Population</span>: ' +
                parseInt(this.getData('population')).toLocaleString() +
                '<br/>' +
                '<span style="color: #d9d9d9">Area</span>: ' +
                parseInt(this.getData('area')).toLocaleString() +
                ' km²'
              );
            });

          // create zoom controls
          var zoomController = anychart.ui.zoom();
          zoomController.render(map);

          // set container id for the chart
          map.container('container');
          // initiate chart drawing
          map.draw();
        }
      );
    });
  }
}
