import { Component } from '@angular/core';
import {ApiService} from './../../services/api.service'
@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent {
  deviceListing: any=[];

  constructor(private apiService:ApiService){

  }

  ngOnInit(){
    this.getLatestInnovator()
  }

  getLatestInnovator() {
    this.apiService.getLatestInnovator().subscribe(res=>{
      console.log(res);
      this.deviceListing=res['data']
    })
  }

}
