import {Component, OnDestroy} from '@angular/core';
import {ApiService} from './../../services/api.service'
interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {
  userDetails: any;

  constructor(private apiService:ApiService) {
    
  }

  ngOnInit(){
    let userDetails = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = userDetails;
    this.getDeviceViews();
    this.getReviewsRecieved();
    this.getStarRatings();
    this.questionsRecieved()
  }

  questionsRecieved() {
    this.apiService.getDeviceViews(this.userDetails.id).subscribe(res=>{
      console.log(res)
    })
  }

  getStarRatings() {
   this.apiService.getStarRatings(this.userDetails.id).subscribe(res=>{
     console.log(res)
   }) 
  }

  getReviewsRecieved() {
    
  }

  getDeviceViews() {
   
  }

  ngOnDestroy() {
    
  }

}
