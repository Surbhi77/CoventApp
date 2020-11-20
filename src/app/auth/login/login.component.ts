import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ApiService} from  './../../services/api.service';
import { Router, NavigationEnd } from '@angular/router';
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

  constructor(private toastr: ToastrService,private fb:FormBuilder,private router: Router,private apiService:ApiService) {
    this.form = fb.group({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required])
    })
  }

  ngOnInit(): void {
  //  alert("called");
  }

  login(){
    if(this.form.valid){
      let obj = {
        "username":this.form.value.email,
        "password":this.form.value.password
      };
      this.apiService.login(obj).subscribe(res=>{
        console.log(res);
        if(res['success']){
          this.invalidLogin = false;
          localStorage.setItem("userData",JSON.stringify(res['data'][0]));
          localStorage.setItem("token",res['token']);
         
          //this.apiService.getUsers().subscribe(res=>{
            this.form.reset();
            this.router.navigateByUrl('/pages/dashboard');
          //})
          
        }else{
          this.invalidLogin = true;
          this.toastr.error('Invalid username or password!')
        }
      },error=>{
        console.log(error)
        this.toastr.error('Something went wrong....please try later')
      })
    }
  }

}
