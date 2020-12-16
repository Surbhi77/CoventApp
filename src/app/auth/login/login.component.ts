import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ApiService} from  './../../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user:any;
  form: FormGroup = new FormGroup({});
  invalidLogin: boolean = false;
  showLoader: boolean = false;

  constructor(private toastr: ToastrService,private fb:FormBuilder,private router: Router,private apiService:ApiService) {
    this.form = fb.group({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required])
    });
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("absolute-header");
  }

  ngOnDestroy(){
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove("absolute-header");
  }

  ngOnInit(): void {
  //  alert("called");
   if(localStorage.getItem("isLoggedIn")){
     this.router.navigateByUrl("/pages/dashboard")
   }
  }

  login(){
    console.log("here",this.form.valid)
    this.showLoader=true;
    if(this.form.valid){
      let obj = {
        "username":this.form.value.email,
        "password":this.form.value.password
      };
      this.apiService.login(obj).subscribe(res=>{
        console.log(res);
        this.showLoader=false
        if(res['success']){
          this.invalidLogin = false;
          localStorage.setItem("userData",JSON.stringify(res['data'][0]));
          this.router.navigateByUrl('/pages');  
        }else{
          this.toastr.error(res['message'])
        }
      },error=>{
        this.showLoader=false
        console.log(error)
      })
    }
  }

}
