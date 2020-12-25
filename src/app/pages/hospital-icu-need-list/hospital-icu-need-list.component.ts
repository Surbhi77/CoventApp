import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ApiService} from  './../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-hospital-icu-need-list',
  templateUrl: './hospital-icu-need-list.component.html',
  styleUrls: ['./hospital-icu-need-list.component.scss']
})
export class HospitalIcuNeedListComponent implements OnInit {

  hospitalsListData:any;
  dtOptions:DataTables.Settings = {};
  successform:any;
  
  constructor(
    private apiService:ApiService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu : [5, 10, 25],
      processing: true
    }

    var userDetails = JSON.parse(localStorage.getItem("userData"));
    let postdata = {"user_id":userDetails.id}
    console.log(postdata);
    this.apiService.hospitalItemList(postdata).subscribe(res=>{
      this.hospitalsListData = res['data']
      console.log(this.hospitalsListData)
    })

  }

  deleteHospitalsItemList(item_id,i){
    if (window.confirm('Are you sure you want to delete?')) {
    
      this.apiService.hospitalItemListDelete(item_id).subscribe(res=>{
        if(res['success']){
          this.hospitalsListData.splice(i,1);
         // this.dtTrigger.next()
        }
      })
    }
  }
}
