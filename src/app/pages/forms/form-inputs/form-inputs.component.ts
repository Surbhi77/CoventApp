import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { ConfirmedValidator } from './confirm.validator';
import { ShepherdService } from 'angular-shepherd';

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./form-inputs.component.scss'],
  templateUrl: './form-inputs.component.html',
})
export class FormInputsComponent implements OnInit {
  public materialTheme$: Observable<boolean>;
  public starRate: number = 2;
  public heartRate: number = 4;
  public radioGroupValue: string = 'This is value 2';
  public showMaterialInputs = false;
  userDetails:any;
  public form:FormGroup;
  profileImage: any=[];
  changePassword: FormGroup;
  url:any;

  public constructor(
              private toastr: ToastrService,
              private fb:FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private apiService:ApiService,
              private readonly themeService: NbThemeService,
              private shepherdService: ShepherdService)
  {
    this.userDetails = JSON.parse(localStorage.getItem("userData"));
    this.form = fb.group({
     "address": new FormControl('',[Validators.required]),
     "user_name": new FormControl('',[Validators.required]),
     "mobile": new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
     "profile_image": new FormControl(''),
     "user_email": new FormControl('',[Validators.required,Validators.email])
    });

    this.changePassword = fb.group({
      "old_password":new FormControl('',[Validators.required]),
      "new_password":new FormControl('',[Validators.required]),
      "confirm_password":new FormControl('',[Validators.required])
    }, {
      validator: ConfirmedValidator('new_password', 'confirm_password')
    })
  }



  ngOnInit() {
    this.getUserDetails()

    this.materialTheme$ = this.themeService.onThemeChange()
    .pipe(tap(theme => {
      const themeName: string = theme?.name || '';
      this.showMaterialInputs = themeName.startsWith('material');
    }));
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
        id: 'custom_form',
        classes: 'shadow-md bg-purple-dark',
        arrow: true,
        attachTo: {
          element: '.editform',
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
            classes: 'shepherd-button-primary',
            text: 'Back',
            type: 'back'
          },
          {
            action(){
              if(self.userDetails.user_type==3){
                self.router.navigateByUrl('/pages/hospital-verification');
              }else{
                self.router.navigateByUrl('/pages/review-list');
              }
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
    console.log('tourguide_status',this.userDetails.user_type);
    if(this.userDetails.tourguide_status==0){
    this.shepherdService.start();
    }
    // this.shepherdService.start()
  }
  //number validation
  get f(){
    return this.form.controls;
  }

  // onFileChange($event){
  //   for (var i = 0; i < $event.target.files.length; i++) {
  //     this.profileImage.push($event.target.files[i]);
  //   }
  // }

  // image preview
   onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      // alert('asdasd')
       var reader = new FileReader();
       this.profileImage.push(event.target.files[0]);
       reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
         this.url = event.target.result;
       }
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
  updateProfile(){
    if(this.form.valid){
      let formdata = new FormData();
      formdata.append("user_id",this.userDetails.id);
      formdata.append("user_name",this.form.value.user_name);
      formdata.append("address",this.form.value.address);
      formdata.append("mobile",this.form.value.mobile);
      if(this.profileImage.length){
        formdata.append("profileimage", this.profileImage[0]);
      }
      let user_id = this.userDetails.id;
      this.apiService.updateUserDetails(formdata,user_id).subscribe(res=>{
        console.log(res);
        if(res['success']){
          let obj ={
            "user_id":this.userDetails.id
          }
          this.apiService.getUserDetails(obj).subscribe(res=>{
            this.apiService.userDataUpdated$.next(res['data'][0])
          })
          this.toastr.success("User profile updated successfully.")
        }
      })
    }else{
      this.toastr.error("Please fill all mandatory fields.")
    }

  }
  updatePassword(){
    if(this.changePassword.valid){
      let obj={
        "user_id":this.userDetails.id,
        "old_password":this.changePassword.value.old_password,
        "user_password":this.changePassword.value.confirm_password,
        "new_password":this.changePassword.value.confirm_password
      }
      this.apiService.changePassword(obj).subscribe(res=>{
        if(res['data'].success){
          this.toastr.success("Password updated successfully")
        }else{
          this.toastr.error(res['data']['message'])
        }

      })
    }else{
      this.changePassword.markAllAsTouched()
    }
  }

  getUserDetails(){
    let obj ={
      "user_id":this.userDetails.id
    }
    this.apiService.getUserDetails(obj).subscribe(res=>{
      console.log(res);
      let details = res['data'][0];
      this.form.patchValue({
        "address":details.address,
        "user_name":details.user_name,
        "mobile":details.mobile,
        "user_email":details.user_email
      });
      if(details.address && details.address!=''){
        this.form.patchValue({
          "address":details.address
        })
      }
      if(details.user_name && details.user_name!=''){
        this.form.patchValue({
          "user_name":details.user_name
        })
      }
      if(details.mobile && details.mobile!=''){
        this.form.patchValue({
          "mobile":details.mobile
        })
      }
      if(details.user_email && details.user_email!=''){
        this.form.patchValue({
          "user_email":details.user_email
        })
      }
    })
  }
}
