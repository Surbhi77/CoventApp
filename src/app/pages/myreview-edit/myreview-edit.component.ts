import { Component, OnInit } from '@angular/core';
import {ApiService} from  './../../services/api.service';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-myreview-edit',
  templateUrl: './myreview-edit.component.html',
  styleUrls: ['./myreview-edit.component.scss']
})
export class MyreviewEditComponent implements OnInit {

  successform:any;
  review_id:any;
  reviewStars:any=[1,2,3,4,5];

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    desccription: new FormControl('', [Validators.required]),
    ratings: new FormControl('', [Validators.required])
  });

  constructor(private apiService:ApiService,private fb:FormBuilder,
    private router: Router,private route: ActivatedRoute,) { }

  ngOnInit(): void {
    let userDetails = JSON.parse(localStorage.getItem("userData"));
    console.log(userDetails);
    this.route.params.subscribe(params =>{
      if(params && params.id){
        console.log(params.id)
        // this.isEditScreen=true

        this.review_id= params.id;
        this.apiService.reviewDetail(this.review_id).subscribe(res=>{
          if(res['success']){
            let review_data = res['data'][0]
            console.log(review_data);
            
            console.log('healthcare_facility_name'+review_data.title);
            this.form.patchValue({
              "title":review_data.title,
              "desccription": review_data.desccription,
              "ratings": review_data.ratings
            });
            this.form.updateValueAndValidity();
          }
        });
      }
    })
    
  }

  get f(){
    return this.form.controls;
  }


  onSubmit(){
    
    if(this.form.valid){
      var formvalue = this.form.getRawValue()
      formvalue.id = this.review_id
      console.log(formvalue);
      this.apiService.updateReviewData(formvalue).subscribe(res=>{
        console.log(res['data'])
        this.successform = 'Successfully Updated';
        this.router.navigateByUrl('/pages/review-list');
      })
      console.log('asdvalid');
    }else{
      console.log('else');
      this.form.markAllAsTouched();
    }
    
  }


}
