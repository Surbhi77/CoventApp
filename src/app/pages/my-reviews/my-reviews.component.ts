import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShepherdService } from 'angular-shepherd';
import {ApiService} from  './../../services/api.service';
@Component({
  selector: 'ngx-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.scss']
})
export class MyReviewsComponent implements OnInit {
  dtOptions: any={}
  reviewListing:any=[];
  userDetails:any;

  constructor(private apiService:ApiService,private shepherdService: ShepherdService,private router:Router) {this.userDetails = JSON.parse(localStorage.getItem("userData")); }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      processing: true
    }
    let userDetails = JSON.parse(localStorage.getItem("userData"));
    this.apiService.getReviewListing(userDetails.id).subscribe(res=>{
      console.log(res);
      this.reviewListing = res['data']
    })

    /************************************/
    this.shepherdService.defaultStepOptions = {

      scrollTo: { behavior: 'smooth', block: 'center' },
      cancelIcon: {
        enabled: true
      },
      classes: 'shadow-md bg-purple-dark',
      useModalOverlay:true,
      keyboardNavigation:true,
      modalContainer :true,
      arrow: true,
    };
    let selffun=this;



    this.shepherdService.addSteps([
      {
        id: 'reviewlist',
        title: 'Review Section',
        text: `Review List`,
        classes: 'shadow-md bg-purple-dark',
        attachTo: {
          element: '.reviewlist',
          on: 'bottom'
        },
        buttons: [

          {
            action(){
              selffun.router.navigateByUrl('/pages/forms/inputs');
              return this.complete();
            },
            classes: 'shepherd-button-primary',
            text: 'Back'
          },
          {
            action() {
              return this.next();
            },
            classes: 'shepherd-button-primary',
            text: 'Next'
          }
        ],

      },
      {
        id:"reviewlist-2",
        title: 'Edit Review',
        text: `click here to edit review`,
        classes: 'shadow-md bg-purple-dark',
        attachTo: {
          element: '.reviewlist-2',
          on: 'bottom'
        },
        buttons: [
          {
            action() {
              selffun.testupdate();
              return this.complete();
            },
            classes: 'shepherd-button-secondary defult-secondary-btn',
            text: 'Exit'
          },
          {
            action() {
              return this.back();
            },
            classes: 'shepherd-button-primary',
            text: 'Back'
          },
          {
            action() {
              selffun.router.navigateByUrl('/pages/change-password');
              return this.complete();
            },
            classes: 'shepherd-button-primary',
            text: 'Next'
          }
        ],
      }
    ]);

    // this.shepherdService.start();
    console.log('tourguide_status',this.userDetails.tourguide_status);
    if(this.userDetails.tourguide_status==0){
    this.shepherdService.start();
    }
    /************************************/

  }


  testupdate(){
    let user_id = this.userDetails.id
    let formdata = new FormData();
    formdata.append("tourguide_status","1");
    this.apiService.updateUserDetails(formdata,user_id).subscribe(res=>{
      console.log('success',res);
      if(res['success']){
        let obj ={
          "user_id":this.userDetails.id
        }
        console.log('obj',obj);
        this.apiService.getUserDetails(obj).subscribe(res=>{
          localStorage.setItem("userData",JSON.stringify(res['data'][0]));

          // this.toastr.success("Tour Complete")
          let userDataNew = JSON.parse(localStorage.getItem("userData"));
          console.log('userDetails',userDataNew);
        })
      }
    })
    console.log('testupdate');
  }

}
