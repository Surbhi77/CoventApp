import { Component, OnInit } from '@angular/core';
import {ApiService} from  './../../services/api.service';

@Component({
  selector: 'ngx-icuneed-list',
  templateUrl: './icuneed-list.component.html',
  styleUrls: ['./icuneed-list.component.scss']
})
export class IcuneedListComponent implements OnInit {

  dtOptions:DataTables.Settings = {};
  icuneedhospitalsListing:any=[];

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
    lengthMenu : [5, 10, 25],
      processing: true
    }
    this.apiService.getIcuNeedHospitalslist().subscribe(res=>{
      console.log(res['data'])
      this.icuneedhospitalsListing = res['data']
    })
  }

}
