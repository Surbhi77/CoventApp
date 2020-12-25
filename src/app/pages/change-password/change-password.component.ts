import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { ApiService } from 'app/services/api.service';
import { ConfirmedValidator } from './confirm.validator';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public materialTheme$: Observable<boolean>;
  public starRate: number = 2;s
  public heartRate: number = 4;
  public radioGroupValue: string = 'This is value 2';
  public showMaterialInputs = false;
  userDetails:any;
  public form:FormGroup;
  profileImage: any=[];
  changePassword: FormGroup;

  public constructor(
              private toastr: ToastrService,
              private fb:FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private apiService:ApiService,
              private readonly themeService: NbThemeService) 
  {
    this.userDetails = JSON.parse(localStorage.getItem("userData"));
    this.form = fb.group({
     "address": new FormControl('',[Validators.required]),
     "user_name": new FormControl('',[Validators.required]),
     "mobile": new FormControl('',[Validators.required]),
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
  //   this.getUserDetails()
  //   //this.materialTheme$ = this.themeService.onThemeChange()
  //  // .pipe(tap(theme => {
  //     const themeName: string = theme?.name || '';
  //     this.showMaterialInputs = themeName.startsWith('material');
  //   }));
  }

  onFileChange($event){
    for (var i = 0; i < $event.target.files.length; i++) { 
      this.profileImage.push($event.target.files[i]);
    }
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