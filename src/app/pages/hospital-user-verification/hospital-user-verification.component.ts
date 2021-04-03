import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ApiService} from  './../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {environment} from 'environments/environment';
import { ShepherdService } from 'angular-shepherd';
@Component({
  selector: 'ngx-hospital-user-verification',
  templateUrl: './hospital-user-verification.component.html',
  styleUrls: ['./hospital-user-verification.component.scss']
})
export class HospitalUserVerificationComponent implements OnInit {

  userDetails:any;
  successform:any;
  fileuploaded:any;
  url:any="";
  documentVerify:any;
  documentFile:any;
  assetBasePath:any=environment.imageUrl
  userverifyform = new FormGroup({

    document: new FormControl('', Validators.required),
  });

  constructor(private toastr: ToastrService,
    private fb:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService:ApiService,
    private shepherdService: ShepherdService) { }


  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem("userData"));
    let userdata = {"user_id":this.userDetails.id}
    this.apiService.getUserDetails(userdata).subscribe(res=>{
      let userDataResult = res['data'][0]
      console.log('userDataResult',userDataResult);
      this.documentVerify = userDataResult.admin_verify_status;
      console.log(this.documentVerify);
      // this.documentFile = userDataResult.document;
      this.documentFile = this.assetBasePath+userDataResult.document;
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
          id: 'hospital-verify',
          classes: 'shadow-md bg-purple-dark',
          arrow: true,
          attachTo: {
            element: '.hospital-verify',
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
                self.router.navigateByUrl('/pages/forms/inputs');
                return this.complete();
              },
              classes: 'shepherd-button-primary',
              text: 'Back'
            },
            {
              action(){

                self.router.navigateByUrl('/pages/hospital-list');

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
          title: 'Verify Hospital',
          text: ['Verify your hospital if not verify.'],
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

  get f(){
    return this.userverifyform.controls;
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

  onSubmit(){
    console.log('asd');
    if(this.userverifyform.valid){
      // var formvalue = this.userverifyform.getRawValue()
      let formdata = new FormData()
      formdata.append('document',this.fileuploaded);
      formdata.append('user_id',this.userDetails.id);
      console.log(this.userDetails.id,this.fileuploaded)
        // formdata.append('device_user_id',userDetails.id);
      // formvalue.hospital_required_items=this.hospitalItems
      // formvalue.user_id=this.userDetails.id

      // formvalue.hospital_id=this.hospital_id.id
      console.log(formdata);

      this.apiService.hospitalVerify(formdata).subscribe(res=>{
        console.log(res['data'])
        this.successform = 'Successfully Updated';
        this.userverifyform.reset();
        // this.router.navigateByUrl('/pages/hospital-ICU-need-list')
      })
      console.log('asdvalid');

    }else{
      alert("here")
      this.userverifyform.markAllAsTouched();
    }
  }

  // onDocFileChange($event){
  //   console.log($event.target.files);
  //   // for (var i = 0; i < $event.target.files.length; i++) {
  //     this.fileuploaded = ($event.target.files[0]);
  //   // }
  // }




  onDocFileChange(event) {
    if (event.target.files && event.target.files[0]) {
       var reader = new FileReader();
       this.fileuploaded = event.target.files[0];
       reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
         this.url = event.target.result;
       }
     }
   }

}
