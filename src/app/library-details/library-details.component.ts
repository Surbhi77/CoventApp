import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {ApiService} from './../services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { StarRatingComponent } from 'ng-starrating';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-library-details',
  templateUrl: './library-details.component.html',
  styleUrls: ['./library-details.component.scss']
})
export class LibraryDetailsComponent implements OnInit {
  categoryId: any;
  deviceDetails:any;
  assetBaseUrl="http://134.209.68.96:9700/"
  safeURL: any;
  currentRate:any=5;
  closeResult: string;
  form: FormGroup = new FormGroup({});
  reviewStars:any=0;
  reviewList:any=[];
  quesList:any=[];
  quesForm:FormGroup = new FormGroup({});
  
  constructor(private toastr: ToastrService,
     private fb:FormBuilder,
     private router:Router,
     private modalService: NgbModal,
     private apiService:ApiService,
     private _sanitizer: DomSanitizer,
     private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      review: new FormControl('',[Validators.required]),
      title: new FormControl('',[Validators.required])
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
    this.apiService.getReviewListing(this.categoryId).subscribe(res=>{
      if(res['data'] && res['data'].length){
        this.reviewList=res['data']
      }else{
        this.reviewList=[];
      }  
    })
  }

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
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
      this.toastr.error("Please login to continue")
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
      this.toastr.error("Please login to continue")
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
