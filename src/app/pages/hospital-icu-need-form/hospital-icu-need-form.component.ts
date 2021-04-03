import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ApiService} from  './../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ShepherdService } from 'angular-shepherd';
@Component({
  selector: 'ngx-hospital-icu-need-form',
  templateUrl: './hospital-icu-need-form.component.html',
  styleUrls: ['./hospital-icu-need-form.component.scss']
})
export class HospitalIcuNeedFormComponent implements OnInit {

  itemCategory:any;
  cat_obj:any;
  itemList:any;
  successform:any;
  userDetails:any;
  hospital_id:any;
  documentVerify:any;
  documentUploadMsg:any;
  urgencyicuneedDataList:any=[];

  icuform = new FormGroup({

    item_category: new FormControl('', Validators.required),
    item_list: new FormControl('', Validators.required),
    urgency_icuneed: new FormControl('', Validators.required),
    device_in_use: new FormControl('', Validators.required),
    device_not_use: new FormControl('', Validators.required),
    device_need_perday: new FormControl('', Validators.required)
  });

  constructor(private toastr: ToastrService,
    private fb:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService:ApiService,private shepherdService:ShepherdService) { }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem("userData"));
    let userdata = {"user_id":this.userDetails.id}
    this.apiService.getUserDetails(userdata).subscribe(res=>{
      let userDataResult = res['data'][0]
      // console.log(this.itemCategory)
      this.documentVerify = userDataResult.admin_verify_status;
      this.documentUploadMsg = (userDataResult.document==null || userDataResult.document=='') ? 'Please complete hospital verification' : 'Hospital ID verification pending';
      // console.log(userDataResult);
      // console.log(this.documentUploadMsg+" document "+userDataResult.document)
    })

    this.apiService.hospitalCategoryListing().subscribe(res=>{
      this.itemCategory = res['data']
      console.log(this.itemCategory)
    })
    this.apiService.hospitalsIcuItemListing(this.userDetails.id).subscribe(res=>{
      this.hospital_id = res['data'][0]
    })
    this.getUrgencyicuneedDataList();

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
          id: 'hospital-add-icu-need',
          classes: 'shadow-md bg-purple-dark',
          arrow: true,
          attachTo: {
            element: '.hospital-add-icu-need',
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
                self.router.navigateByUrl('/pages/hospital-list');
                return this.complete();
              },
              classes: 'shepherd-button-primary',
              text: 'Back'
            },
            {
              action(){

                self.router.navigateByUrl('/pages/hospital-ICU-need-list');

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
          title: 'ICU Need',
          text: ['Add ICU Need.'],
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
  selectCategory(catid){
    console.log(catid.value)

    if(catid){
      this.cat_obj={"category_id":catid.value}
      console.log(this.cat_obj);
      this.apiService.hospitalItemListing(this.cat_obj).subscribe(res=>{
        this.itemList = res['data']
        console.log(this.itemList)
      })
    }else{
      this.itemList='';
    }
  }

  get f(){
    return this.icuform.controls;
  }

  onSubmit(){
    console.log(this.icuform.getRawValue());
    if(this.icuform.valid){
      var formvalue = this.icuform.getRawValue()
      // formvalue.hospital_item_cat_id=this.hospitalItemCatId
      // formvalue.hospital_required_items=this.hospitalItems
      formvalue.user_id=this.userDetails.id

      formvalue.hospital_id=this.hospital_id.id
      console.log(formvalue);

      this.apiService.hospitalItemData(formvalue).subscribe(res=>{
        console.log(res['data'])
        this.successform = 'Successfully Updated';
        this.router.navigateByUrl('/pages/hospital-ICU-need-list')
      })
      console.log('asdvalid');

    }else{
      this.icuform.markAllAsTouched();
    }
  }

  getUrgencyicuneedDataList(){
    this.urgencyicuneedDataList =[
      {id:"Emergent",value:"Emergent (no alternatives available, unable to meet current need)"},
      {id:"Urgent",value:"Urgent (able to meet current need, >95% of supply in use)"},
      {id:"Critical",value:"Critical (able to meet current need, >90% of supply in use)"},
      {id:"High Risk",value:"High Risk (able to meet current need, >80% of supply in use)"},
      {id:"Medium Risk",value:"Medium Risk (>70% of supply in use)"},
      {id:"Low Risk",value:"Low Risk (<70% of supply in use)"}
    ]
    console.log(this.urgencyicuneedDataList);
  }


}
