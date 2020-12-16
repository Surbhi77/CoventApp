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

  constructor(private toastr: ToastrService,private fb:FormBuilder,private apiService:ApiService) {
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
      
    })
  }

}
