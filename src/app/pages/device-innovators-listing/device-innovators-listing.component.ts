import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
import {ApiService} from  './../../services/api.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-device-innovators-listing',
  templateUrl: './device-innovators-listing.component.html',
  styleUrls: ['./device-innovators-listing.component.scss']
})
export class DeviceInnovatorsListingComponent {
   dtOptions:DataTables.Settings = {};
   settings = {
    actions: {
      add: false,
      position: 'right'
      },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    view:{
      viewButtonContent: '<i class="nb-trash"></i>',
    },
    columns: {
      id: {
        title: 'S.no',
        type: 'number',
        filter: false
      },
      device_name: {
        title: 'Device Name',
        type: 'string',
        filter: false
      },
      category_name: {
        title: 'Device Category',
        type: 'string',
        filter: false
      },
      subcategory_name: {
        title: 'Device Type',
        type: 'string',
        filter: false
      },
      device_created_date: {
        title: 'Create Date',
        type: 'date',
        filter: false
      },

      // username: {
      //   title: 'Status',
      //   type: 'string',
      //   filter: false
      // },
      // lastname: {
      //   title: 'Created Date',
      //   type: 'string',
      //   filter: false
      // },
      // age: {
      //   title: 'Verification Status',
      //   type: 'number',
      //   filter: false
      // },
    },
  };
 // dtTrigger:any=Subject;
  source: LocalDataSource = new LocalDataSource();
  deviceListing: any=[];
  dtTrigger = new Subject();

  constructor(private service: SmartTableData,private apiService:ApiService) {
    
      
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
        this.dtTrigger.next();
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
