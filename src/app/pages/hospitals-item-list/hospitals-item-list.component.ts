import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ApiService} from  './../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-hospitals-item-list',
  templateUrl: './hospitals-item-list.component.html',
  styleUrls: ['./hospitals-item-list.component.scss']
})
export class HospitalsItemListComponent implements OnInit {
  hospitalsListData:any;
  dtOptions:DataTables.Settings = {};

  constructor(private fb:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService:ApiService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      processing: true
    }

    // console.log(localStorage.getItem("userData"));
    var userDetails = JSON.parse(localStorage.getItem("userData"));
    // console.log(userDetails);
    this.apiService.hospitalsIcuItemListing(userDetails.id).subscribe(res=>{
      this.hospitalsListData = res['data']
      console.log(this.hospitalsListData)
      this.router.navigateByUrl("/pages/hospital-edit/"+this.hospitalsListData[0].id)
    })
    // this.hospitalsListData
  }

  deleteHospitalsList(item_id,i){
    if (window.confirm('Are you sure you want to delete?')) {
    
      this.apiService.deleteHospital(item_id).subscribe(res=>{
        if(res['success']){
          this.hospitalsListData.splice(i,1);
         // this.dtTrigger.next()
        }
      })
    }
  }
}
