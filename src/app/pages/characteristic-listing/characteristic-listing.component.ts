import { Component, OnInit } from '@angular/core';
import {ApiService} from  './../../services/api.service';

@Component({
  selector: 'ngx-characteristic-listing',
  templateUrl: './characteristic-listing.component.html',
  styleUrls: ['./characteristic-listing.component.scss']
})
export class CharacteristicListingComponent implements OnInit {
  dtOptions:DataTables.Settings = {};
  characteristicListing: any=[];
  constructor(private apiService:ApiService) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      processing: true
    }
    this.apiService.characteristicListing().subscribe(res=>{
      this.characteristicListing = res['data'];
      console.log(this.characteristicListing);
      //this.dtTrigger.next()
    })
  }

  ngOnInit(): void {
  }

  deleteCharacteristics(item,i){
    if (window.confirm('Are you sure you want to delete?')) {
    
      this.apiService.characteristicsDelete(item.characteristics_id).subscribe(res=>{
        if(res['success']){
          this.characteristicListing.splice(i,1);
         // this.dtTrigger.next()
        }
      })
    }
  }

}
