import { Component, OnInit } from '@angular/core';
var google:any;
@Component({
  selector: 'ngx-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    google.load('visualization', '1', {'packages': ['geochart']});
    //google.setOnLoadCallback(drawVisualization);

  var data = new google.visualization.DataTable();

 data.addColumn('number', 'Lat');                                
 data.addColumn('number', 'Long');
 data.addColumn('number', 'Value'); 
 data.addColumn({type:'string', role:'tooltip'});                        

data.addRows([[41.151636,-8.569336,0,'tooltip']]);
data.addRows([[ 39.059575,-98.789062,0,'tooltip']]);
                               
 
 var options = {
 colorAxis:  {minValue: 0, maxValue: 0,  colors: ['#6699CC']},
 legend: 'none',    
 backgroundColor: {fill:'transparent',stroke:'#FFF' ,strokeWidth:0 },    
 datalessRegionColor: '#f5f5f5',
 displayMode: 'markers', 
 enableRegionInteractivity: 'true', 
 resolution: 'countries',
 sizeAxis: {minValue: 1, maxValue:1,minSize:5,  maxSize: 5},
 region:'world',
 keepAspectRatio: true,
 width:400,
 height:300,
 tooltip: {textStyle: {color: '#444444'}}    
 };
  var chart = new   google.visualization.GeoChart(document.getElementById('visualization')); 
     
    
 
 chart.draw(data, options);
 
 
 
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("absolute-header");
  }
  ngOnDestroy(){
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove("absolute-header");
  }

}
