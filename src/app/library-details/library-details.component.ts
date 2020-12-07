import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {ApiService} from './../services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'ngx-library-details',
  templateUrl: './library-details.component.html',
  styleUrls: ['./library-details.component.scss']
})
export class LibraryDetailsComponent implements OnInit {
  categoryId: any;
  deviceDetails:any;
  assetBaseUrl="http://localhost:9700/"
  safeURL: any;
  currentRate:any=5

  constructor(private router:Router,
     private apiService:ApiService,
     private _sanitizer: DomSanitizer,
     private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryId = this.activatedRoute.snapshot.params['id'];
    console.log(this.categoryId);
    this.getDeviceDetails()
  }

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }

  getDeviceDetails(){
    let obj={
      category_id:this.categoryId
    }
    this.apiService.getInnovatorDetail(this.categoryId).subscribe(res=>{
      console.log(res)
      if(res['success']){
        this.deviceDetails =  res['data'][0];
        this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.deviceDetails.device_videos);
      }
    })
  }

  get f(){
    console.log(localStorage.getItem("userData"))
    return localStorage.getItem("userData")
  }



}
