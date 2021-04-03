import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ApiService} from  './../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ShepherdService } from 'angular-shepherd';
@Component({
  selector: 'ngx-hospital-icu-need-list',
  templateUrl: './hospital-icu-need-list.component.html',
  styleUrls: ['./hospital-icu-need-list.component.scss']
})
export class HospitalIcuNeedListComponent implements OnInit {

  hospitalsListData:any;
  dtOptions:DataTables.Settings = {};
  successform:any;
  userDetails:any
  constructor(
    private apiService:ApiService,private shepherdService:ShepherdService,private router:Router) { this.userDetails = JSON.parse(localStorage.getItem("userData"));}

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

    /*********************/
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
          id: 'hospital-icu-need-list',
          classes: 'shadow-md bg-purple-dark',
          arrow: true,
          attachTo: {
            element: '.hospital-icu-need-list',
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
              action() {
                self.testupdate();
                return this.complete();
              },
              classes: 'shepherd-button-secondary defult-secondary-btn',
              text: 'Exit'
            },
            {
              action(){
                self.router.navigateByUrl('/pages/hospital-ICU-need');
                return this.complete();
              },
              classes: 'shepherd-button-primary',
              text: 'Back'
            },
            {
              action(){

                self.router.navigateByUrl('/pages/change-password');

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
          title: 'ICU Need List',
          text: ['Hospital ICU Need List.'],
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
      console.log('tourguide_status',this.userDetails.user_type);
      if(this.userDetails.tourguide_status==0){
      this.shepherdService.start();
      }
      // this.shepherdService.start()
    /*********************/

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


          let userDataNew = JSON.parse(localStorage.getItem("userData"));
          console.log('userDetails',userDataNew);
        })
      }
    })
    console.log('testupdate');
  }
}
