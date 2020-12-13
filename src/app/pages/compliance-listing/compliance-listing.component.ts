import { Component, OnInit } from '@angular/core';
import {ApiService} from  './../../services/api.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'ngx-compliance-listing',
  templateUrl: './compliance-listing.component.html',
  styleUrls: ['./compliance-listing.component.scss']
})
export class ComplianceListingComponent implements OnInit {
  dtOptions:DataTables.Settings = {};
  complianceList:any=[];
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private apiService:ApiService) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      processing: true
    }
    this.apiService.complianceListing().subscribe(res=>{
      this.complianceList = res['data'];
      console.log(this.complianceList);
      //this.dtTrigger.next()
    })
  }

  ngOnInit(): void {
  }

  deleteCompliance(item,i){
    if (window.confirm('Are you sure you want to delete?')) {
    
      this.apiService.complianceDelete(item.compliance_id).subscribe(res=>{
        if(res['success']){
          this.complianceList.splice(i,1);
         // this.dtTrigger.next()
        }
      })
    }
    
  }

}
