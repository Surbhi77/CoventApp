import { Component, OnInit } from '@angular/core';
import {ApiService} from  './../../services/api.service';
import {environment} from 'environments/environment';

@Component({
  selector: 'ngx-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  dtOptions:DataTables.Settings = {};
  teamListing:any=[];
  assetBasePath:any=environment.imageUrl
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      processing: true
    }
    this.apiService.teamList().subscribe(res=>{
      this.teamListing = res['data']
      console.log(this.teamListing);
    })
  }

 

  onDeleteConfirm(item_id,i): void {
    if (window.confirm('Are you sure you want to delete?')) {
    
      this.apiService.teamDelete(item_id).subscribe(res=>{
        if(res['success']){
          this.teamListing.splice(i,1);
         // this.dtTrigger.next()
        }
      })
    }
  }

}
