import { Component, OnInit } from '@angular/core';
import {ApiService} from  './../../services/api.service';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-device-innovator-detail',
  templateUrl: './device-innovator-detail.component.html',
  styleUrls: ['./device-innovator-detail.component.scss']
})
export class DeviceInnovatorDetailComponent implements OnInit {
  device_id:any;
  device_data:any;
  assetsbasepath:any='http://localhost:9700/';
  constructor(private apiService:ApiService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      console.log(params);
      if(params && params.id){
        // this.isEditScreen=true

        this.device_id= params.id;
        
        this.apiService.getDeviceInnovatorDetail(this.device_id).subscribe(res=>{
          if(res['success']){
            this.device_data = res['data'][0]
            console.log(this.device_data);
          }
        });
      }
      // console.log(this.hospital_id)
      // this.orderId = params.id;
      // this.getOrderDetails()
    })
    // getDeviceInnovatorDetail
  }

}
