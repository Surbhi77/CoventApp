import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from './../services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { StarRatingComponent } from 'ng-starrating';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {environment} from 'environments/environment'
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-library-details',
  templateUrl: './library-details.component.html',
  styleUrls: ['./library-details.component.scss'],
  providers: [NgbCarouselConfig]
})
export class LibraryDetailsComponent implements OnInit {
  categoryId: any;
  deviceDetails:any;
  assetBaseUrl=environment.imageUrl;
  safeURL: any;
  currentRate:any=5;
  closeResult: string;
  form: FormGroup = new FormGroup({});
  reviewStars:any=0;
  reviewList:any=[];
  quesList:any=[];
  quesForm:FormGroup = new FormGroup({});
  showModal:boolean=false;
  loginForm: FormGroup;
  submitted: boolean=false;
  isLoggedIn:boolean=false;
  userDetails:any;
  
  constructor(private toastr: ToastrService,
     private fb:FormBuilder,
     config: NgbCarouselConfig,
     private modalService: NgbModal,
     private apiService:ApiService,
     private _sanitizer: DomSanitizer,
     private activatedRoute:ActivatedRoute) {
      config.interval = 2000;
      config.keyboard = true;
      config.pauseOnHover = true;
  }

 

  scroll(el) {
    console.log("here");
    let element = document.getElementById(el);
    element.scrollIntoView({behavior:"smooth"});
  }

  get j(){ 
    return this.loginForm.controls; 
  }

  checkLogin():boolean{
    if(localStorage.getItem("userData")){
      return true
    }else{
      return false
    }
  }

  onSubmit(){
    this.submitted = true;
    if(this.loginForm.valid){
      let obj = {
        "username":this.loginForm.value.email,
        "password":this.loginForm.value.password
      };
      this.apiService.login(obj).subscribe(res=>{
        console.log(res);
        if(res['success']){
          this.toastr.success('Login Successfull')
          localStorage.setItem("userData",JSON.stringify(res['data'][0]));
          this.userDetails=res['data'][0];
          this.showModal=false;
          this.apiService.userLoggedOutorIn$.next(1);
        }else{
          this.toastr.error('Email or password do not match')
        }
      },error=>{
        console.log(error)
      })
    }else{
      return
    }
  }

  ngOnInit(): void {
    if(localStorage.getItem("userData")){
      this.userDetails = JSON.parse(localStorage.getItem("userData"))
    }
    this.form = this.fb.group({
      review: new FormControl('',[Validators.required]),
      title: new FormControl('',[Validators.required])
    });
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.quesForm = this.fb.group({
      question:new FormControl('',[Validators.required])
    })
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("absolute-header");
    this.categoryId = this.activatedRoute.snapshot.params['id'];
    console.log(this.categoryId);
    this.getDeviceDetails();
    this.getReviewListing();
    this.getQuestionListing();
    this.updateViewCount()
  }

  updateViewCount(){
    let obj={
      "innovator_id":this.categoryId
    }
    this.apiService.updateViewCount(obj).subscribe(res=>{
      
    })
  }

  getReviewListing(){
    this.apiService.getReviewListingByInnovator(this.categoryId).subscribe(res=>{
      if(res['data'] && res['data'].length){
        this.reviewList=res['data']
      }else{
        this.reviewList=[];
      }  
    })
  }

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    // alert(`Old Value:${$event.oldValue}, 
    //   New Value: ${$event.newValue}, 
    //   Checked Color: ${$event.starRating.checkedcolor}, 
    //   Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }

  getDeviceDetails(){
    let obj={
      category_id:this.categoryId
    }
    this.apiService.getInnovatorDetail(this.categoryId).subscribe(res=>{
      console.log(res)
      if(res['success']){
        this.deviceDetails =  res['data'][0];
        this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.deviceDetails.device_videos);
      }
    })
  }

  get f(){
    //console.log(localStorage.getItem("userData"))
    return localStorage.getItem("userData")
  }

  ngOnDestroy(){
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove("absolute-header");
  }

  open(content) {
    if(localStorage.getItem("userData")){
      console.log(content)
      this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(result);
        if(result == 'Save click'){
          let userDetails = JSON.parse(localStorage.getItem("userData"));
          
          let obj={
            "desccription":this.form.value.review,
            "ratings":this.reviewStars,
            "innovator_id":this.categoryId,
            "title":this.form.value.title,
            "user_id":userDetails.id
          }
          this.apiService.addReview(obj).subscribe(res=>{
            console.log(res);
            this.getReviewListing()
          })
        }
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }else{
      this.showModal=true;
      this.toastr.error('Please login to continue')
    }
    
  }

  openQuestion(content) {
    if(localStorage.getItem("userData")){
      console.log(content)
      this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(result);
        if(result == 'Save click'){
          let userDetails = JSON.parse(localStorage.getItem("userData"));
          
          let obj={
            "question":this.form.value.quesForm,
            "innovator_id":this.categoryId,
            "user_id":userDetails.id
          }
          this.apiService.addQuestion(obj).subscribe(res=>{
            console.log(res);
            this.getQuestionListing()
          })
        }
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }else{
      this.toastr.error("Please login to continue");
      this.showModal=true
    }
    
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  private getQuestionListing(){
    this.apiService.getQuestionList(this.categoryId).subscribe(res=>{
      if(res['data'] && res['data'].length){
        this.quesList=res['data']
      }else{
        this.quesList=[];
      }  
    })
  }



}
