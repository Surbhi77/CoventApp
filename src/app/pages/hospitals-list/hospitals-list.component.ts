import { Component, OnInit } from '@angular/core';
import {ApiService} from  './../../services/api.service';

@Component({
  selector: 'ngx-hospitals-list',
  templateUrl: './hospitals-list.component.html',
  styleUrls: ['./hospitals-list.component.scss']
})
export class HospitalsListComponent implements OnInit {
  dtOptions:DataTables.Settings = {};
  hospitalsListing:any=[];

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
    lengthMenu : [5, 10, 25],
      processing: true
    }
    this.apiService.getHospitalslist().subscribe(res=>{
      console.log(res['data'])
      this.hospitalsListing = res['data']
    })
  }

  deleteListing(item_id,i){
    console.log(item_id);
    console.log(i);
    if (window.confirm('Are you sure you want to delete?')) {
    
      this.apiService.deleteHospital(item_id).subscribe(res=>{
        if(res['success']){
          this.hospitalsListing.splice(i,1);
         // this.dtTrigger.next()
        }
      })
    }
  }
}
