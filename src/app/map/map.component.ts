import { Component, OnInit } from '@angular/core';
import {
  ChartReadyEvent,
  ChartErrorEvent,
  ChartSelectEvent,
  ChartMouseOverEvent,
  ChartMouseOutEvent,
  RegionClickEvent,
  GoogleChartInterface,
  GoogleChartsControlInterface,
  GoogleChartsDashboardInterface,
  GoogleChartEditor,
  GoogleChartWrapper,
} from 'ng2-google-charts';

declare var $: any;
declare var google: any;

@Component({
  selector: 'ngx-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  public geoChart: GoogleChartInterface = {
    chartType: 'GeoChart',
    dataTable: [
      ['Latitude', 'Longitude', 'Label','Value 1'],
      [43.8766588,-97.1530225, 'Mayo Clinic, Rochester', 9.0],
      [24.4749673,-90.2057287, 'UChicago Medicine', 3.0],
      [39.2967385,-76.5949249, 'Johns Hopkins Hospital', 1.0],
      [34.071494,-118.3829765, 'Cedars-Sinai Medical Center', 6.0],
    ],
    options: {
      colorAxis: {colors: ['#ffc107', '#fd7e14', '#dc3545']},
      backgroundColor: '#9cf',
      datalessRegionColor: '#f8f9fa',
      defaultColor: '#6c757d',
    }
  };
  lat = 38.907192;
  long = -77.036873;
  zoom = 3;
  constructor() { }

  ngOnInit(): void {
  
  }
  ngOnDestroy(){
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove("absolute-header");
  }

}
