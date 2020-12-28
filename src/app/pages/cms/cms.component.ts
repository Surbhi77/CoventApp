import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
import {ApiService} from  './../../services/api.service';


@Component({
  selector: 'ngx-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})
export class CmsComponent {
  dtOptions: any={}
  source: LocalDataSource = new LocalDataSource();
  deviceListing: any;
  //dtOptions:any;

  constructor(private apiService:ApiService,private service: SmartTableData) {
 
  }

  ngOnInit(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      processing: true
    }
    let userDetails = JSON.parse(localStorage.getItem("userData"));
    let obj={
      "user_id":userDetails.id
    }
    this.apiService.getListing(obj).subscribe(res=>{
      if(res["success"]){
        this.deviceListing = res['data'];
        /*this.deviceListing.forEach((currentValue, index) => {
          currentValue.id = index+1
        });*/
        // this.source.load(this.deviceListing)
      }else{
        this.deviceListing = [];
      }
    })
  }

  onDeleteConfirm(event,i): void {
    console.log(event)
    if(window.confirm('Are you sure you want to delete')) {
      this.apiService.deleteDevice(event.device_data_id).subscribe(res=>{
        if(res['success']){

          var newArr = this.deviceListing
          newArr.forEach((currentValue, index) => {
            currentValue.id = index+1
          });
          this.deviceListing.splice(i,1)
        // this.source.update(this.deviceListing,newArr)
          //this.source.refresh()
          //event.confirm.resolve();
        }
      })
    }
    // if (window.confirm('Are you sure you want to delete?')) {
    //   event.confirm.resolve();
    // } else {
    //   event.confirm.reject();
    // }
  }


}
