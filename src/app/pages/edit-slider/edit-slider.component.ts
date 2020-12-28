import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ApiService} from  './../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-edit-slider',
  templateUrl: './edit-slider.component.html',
  styleUrls: ['./edit-slider.component.scss']
})
export class EditSliderComponent implements OnInit {
  slider_id:any;
  constructor(private toastr: ToastrService,
    private fb:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService:ApiService) { }

  icuform = new FormGroup({    
    heading: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    button_text: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      if(params && params.id){
        console.log(params.id)
        // this.isEditScreen=true

        this.slider_id= params.id;
        console.log('icu',this.slider_id)
        this.apiService.sliderDetailData(this.slider_id).subscribe(res=>{
          if(res['success']){
            let item_data = res['data'][0]
            console.log(item_data);
            
            this.icuform.patchValue({
              "heading":item_data.heading,
              "description": item_data.description,
              "button_text": item_data.button_text
            });
            this.icuform.updateValueAndValidity();
          }
        });
      }
    })
  }

  get f(){
    return this.icuform.controls;
  }

  onSubmit(){
    console.log(this.icuform.getRawValue());
    if(this.icuform.valid){
      var formvalue = this.icuform.getRawValue()
      // formvalue.hospital_item_cat_id=this.hospitalItemCatId
      // formvalue.hospital_required_items=this.hospitalItems
      // formvalue.user_id=this.userDetails.id
      
      formvalue.id=this.slider_id
      console.log(formvalue);
    
      this.apiService.updateSliderData(formvalue).subscribe(res=>{
        console.log(res['data'])
        // this.successform = 'Successfully Updated';
        this.router.navigateByUrl('/pages/slider-management')
        console.log('success');
      })
      

    }else{
      this.icuform.markAllAsTouched();
    }
  }

}
