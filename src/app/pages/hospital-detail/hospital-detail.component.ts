import { Component, OnInit } from '@angular/core';
import {ApiService} from  './../../services/api.service';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-hospital-detail',
  templateUrl: './hospital-detail.component.html',
  styleUrls: ['./hospital-detail.component.scss']
})
export class HospitalDetailComponent implements OnInit {
  hospital_id:any;
  hospital_data:any;
  
  constructor(private apiService:ApiService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      console.log(params);
      if(params && params.id){
        // this.isEditScreen=true

        this.hospital_id= params.id;
        
        this.apiService.getHospitalDetail(this.hospital_id).subscribe(res=>{
          if(res['success']){
            this.hospital_data = res['data'][0]
            console.log(this.hospital_data);
          }
        });
      }
      // console.log(this.hospital_id)
      // this.orderId = params.id;
      // this.getOrderDetails()
    })
  }

}
