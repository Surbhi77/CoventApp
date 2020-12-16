import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ApiService} from  './../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  form:FormGroup= new FormGroup({});
 // codeForm:FormGroup= new FormGroup({});
  emailSent:boolean=false;
  code:any;
  password:any;
  con_password:any;
  emailNcodeverify:boolean=true;
  passwordValidation:boolean=false;
  passwordmatchValidation:boolean=false;

  constructor(private toastr: ToastrService,
    private router: Router,
    private fb:FormBuilder,
    private apiService:ApiService) {
    this.form = fb.group({
      email: new FormControl('',[Validators.required,Validators.email]),
    });
  }

  ngOnInit(): void {

  }

  verify(){
    let obj={
      "user_email":this.form.value.email
    }
    this.apiService.forgotPassword(obj).subscribe(res=>{
      console.log(res);
      this.emailSent = true;
    })
  }

  codeVerify(){
    let obj={
      "user_email":this.form.value.email,
      "code":this.code
    }
    this.apiService.verifyCode(obj).subscribe(res=>{
      console.log(res['data'])
      if(res['data'].success==true){
        this.emailNcodeverify=false
      }else{
        res['data'].message
      }
    })
  }

  saveNewPassword(){
    console.log('asdasd');
    if(this.password && this.con_password){
      if(this.password!=this.con_password){
        this.passwordValidation=false;
        this.passwordmatchValidation=true;
      }else{
        let objectData={
          "user_email":this.form.value.email,
          "code":this.code,
          "password":this.password
        }
        this.passwordmatchValidation=false;
        console.log(objectData);
        this.apiService.updatePassword(objectData).subscribe(res=>{
          console.log(res['data'])
          if(res['success']==true){
            this.router.navigateByUrl('/auth/login')
          }
        })
      }
    }else{
      this.passwordValidation=true;
    }
  }

}
