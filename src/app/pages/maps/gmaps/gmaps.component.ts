import { Component,ViewChild  } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap, GoogleMapsModule  } from '@angular/google-maps'

@Component({
  selector: 'ngx-gmaps',
  styleUrls: ['./gmaps.component.scss'],
  templateUrl: './gmaps.component.html',
})
export class GmapsComponent {
  readonly position = { lat: 51.678418, lng: 7.809007 };
  infoContent = '<h1>Here hello</h1><p>Here</p>';
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow

  openInfo(marker: MapMarker, content) {
   // alert("click")
    this.infoContent = "<h1>Here hello</h1><p>Here ghfhghfg</p>"
    this.info.open(marker);
    
  }
}
