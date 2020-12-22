import { Component, OnInit } from '@angular/core';
import { ConfirmedValidator } from './confirmed.validator';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {ApiService} from  './../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(private toastr: ToastrService,private router: Router,private api:ApiService,private fb:FormBuilder) { 
    //alert("called")
    this.form = fb.group({
      user_name:['',[Validators.required]],
      user_email:['',[Validators.email,Validators.required]],
      user_type:['',[Validators.required]],
      password: ['', [Validators.required]],
      healthcare_facility_name: [''],
      confirm_password: ['', [Validators.required]]
    }, { 
      validator: ConfirmedValidator('password', 'confirm_password')
    });
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("absolute-header");
  }

  ngOnInit(): void {
    this.form.get('user_type').valueChanges.subscribe(val => {
      console.log(val);
      if(val == 3){
          this.form.get('healthcare_facility_name').setValidators([Validators.required]);
          this.form.get('healthcare_facility_name').updateValueAndValidity();
      }else{
          this.form.get('healthcare_facility_name').clearValidators();
          this.form.get('healthcare_facility_name').updateValueAndValidity();
      }
    });
  }

  ngOnDestroy(){
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove("absolute-header");
  }

  get f(){
    return this.form.controls;
  }

  register(){
    // console.log(this.form.value);
    if(this.form.valid){
      let obj={
        user_name:this.form.value.user_name,
        user_email:this.form.value.user_email,
        user_type:this.form.value.user_type,
        password:this.form.value.password,
        healthcare_facility_name:this.form.value.healthcare_facility_name
      };
      console.log(obj);
      this.api.register(obj).subscribe(res=>{
        if(res['success']){
          this.toastr.success('Verification email sent, Please verify your email address to login.');
          this.router.navigateByUrl('/auth/login');
        }else{
          this.toastr.error(res['message'])
        }
      })
    }else{
      this.form.markAllAsTouched();
    }
  }

}
