import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ApiService} from  './../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-add-sliders',
  templateUrl: './add-sliders.component.html',
  styleUrls: ['./add-sliders.component.scss']
})
export class AddSlidersComponent implements OnInit {

  successform:any;
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
      
      // formvalue.hospital_id=this.hospital_id.id
      console.log(formvalue);
    
      this.apiService.addSliderData(formvalue).subscribe(res=>{
        console.log(res['data'])
        // this.successform = 'Successfully Updated';
        this.router.navigateByUrl('/pages/slider-management')
      })
      console.log('asdvalid');

    }else{
      this.icuform.markAllAsTouched();
    }
  }

}
