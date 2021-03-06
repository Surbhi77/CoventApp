import { Component, OnInit } from '@angular/core';
import {ApiService} from  './../../services/api.service';

@Component({
  selector: 'ngx-slider-management',
  templateUrl: './slider-management.component.html',
  styleUrls: ['./slider-management.component.scss']
})
export class SliderManagementComponent{
  dtOptions:DataTables.Settings = {};
  sliderListing:any=[];

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      processing: true
    }
    this.apiService.sliderList().subscribe(res=>{
      this.sliderListing = res['data']
      console.log(this.sliderListing);
    })

  }

 

  onDeleteConfirm(item_id,i): void {
    if (window.confirm('Are you sure you want to delete?')) {
    
      this.apiService.sliderDelete(item_id).subscribe(res=>{
        if(res['success']){
          this.sliderListing.splice(i,1);
         // this.dtTrigger.next()
        }
      })
    }
  }
}
