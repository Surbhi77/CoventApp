import { Component } from '@angular/core';
import {ApiService} from  './../../services/api.service';

@Component({
  selector: 'ngx-device-innovators-listing',
  templateUrl: './device-innovators-listing.component.html',
  styleUrls: ['./device-innovators-listing.component.scss']
})
export class DeviceInnovatorsListingComponent {
   dtOptions:DataTables.Settings = {};

  deviceListing: any=[];


  constructor(private apiService:ApiService) {
    
      
    //const data = this.service.getData();
   // console.log(data)
   // this.source.load(data);
  }

  ngOnInit(){
    // let userDetails = JSON.parse(localStorage.getItem("userData"));
    // let obj={
    //   "user_id":userDetails.id
    // }
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
    lengthMenu : [5, 10, 25],
      processing: true
    }
    this.apiService.getInnovatorList().subscribe(res=>{
      if(res["success"]){
        this.deviceListing = res['data'];
        this.deviceListing.forEach((currentValue, index) => {
          currentValue.id = index+1
        });
       // this.dtTrigger.next();
      //  this.source.load(this.deviceListing)
      }else{
        this.deviceListing = [];
      }
    })
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  block(item,i){
   // alert("here");
   console.log(item,i);
   this.apiService.blockDevice(item.device_data_id).subscribe(res=>{
     if(res['success']){
       this.deviceListing[i].device_status=0
     }
   })
  }

  unblock(item,i){
    console.log(item,i);
    this.apiService.unBlockDevice(item.device_data_id).subscribe(res=>{
      if(res['success']){
        this.deviceListing[i].device_status=1
      }
    })
    //alert("unblock called")
  }

}
