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
      // id: {
      //   title: 'S.no',
      //   type: 'number',
      //   filter: false
      // },
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
  // dtOptions:any={};
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

  onDeleteConfirm(event): void {
    console.log(event)
    if(window.confirm('Are you sure you want to delete')) {
      this.apiService.deleteDevice(event.data.device_data_id).subscribe(res=>{
        if(res['success']){

          var newArr = this.deviceListing
          newArr.forEach((currentValue, index) => {
            currentValue.id = index+1
          });
        // this.source.update(this.deviceListing,newArr)
          this.source.refresh()
          event.confirm.resolve();
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
