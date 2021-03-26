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

  constructor(private apiService:ApiService,private shepherdService: ShepherdService,private router:Router) { }

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
    this.shepherdService.defaultStepOptions = {
   
      scrollTo: true,
      cancelIcon: {
        enabled: true
      },
      useModalOverlay : true,
      classes: 'shepherd-theme-custom'
    };
    let self=this;
    this.shepherdService.addSteps([
      {
        id: 'Review',
        classes: 'shadow-md bg-purple-dark',
        arrow: true,
        attachTo: { 
          element: '.review', 
          on: 'bottom'
          
        },
        beforeShowPromise: function() {
          return new Promise<void>(function(resolve) {
            setTimeout(function() {
              window.scrollTo(0, 0);
              resolve();
            }, 500);
          });
        },
        buttons: [
          {
            classes: 'shepherd-button-secondary',
            text: 'Exit',
            type: 'cancel'
          },
          {
            classes: 'shepherd-button-primary',
            text: 'Back',
            type: 'back'
          },
          {
            action(){
              
              self.router.navigateByUrl('/pages/review-list');
              return this.complete();
             
            },
            classes: 'shepherd-button-primary',
            text: 'Next',
           
            
          }
        ],
        cancelIcon: {
          enabled: true
        },
        highlightClass: 'highlight',
        scrollTo: true,
        title: 'Welcome',
        text: ['Angular-Shepherd is a JavaScript library for guiding users through your Angular app.'],
        when: {
          show: () => {
            console.log('show step');
          },
          hide: () => {
            console.log('hide step');
          }
        }
      }
    ])
    
  }

}
