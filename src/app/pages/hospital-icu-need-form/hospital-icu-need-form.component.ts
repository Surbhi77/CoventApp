import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ApiService} from  './../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-hospital-icu-need-form',
  templateUrl: './hospital-icu-need-form.component.html',
  styleUrls: ['./hospital-icu-need-form.component.scss']
})
export class HospitalIcuNeedFormComponent implements OnInit {

  itemCategory:any;
  cat_obj:any;
  itemList:any;
  successform:any;

  icuform = new FormGroup({
    
    item_category: new FormControl('', Validators.required),
    item_list: new FormControl('', Validators.required)
  });

  constructor(private toastr: ToastrService,
    private fb:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService:ApiService) { }

  ngOnInit(): void {
    this.apiService.hospitalCategoryListing().subscribe(res=>{
      this.itemCategory = res['data']
      console.log(this.itemCategory)
    })
  }

  selectCategory(catid){
    console.log(catid)
    
    if(catid){
      this.cat_obj={"category_id":catid}
      // console.log(this.cat_obj);
      this.apiService.hospitalItemListing(this.cat_obj).subscribe(res=>{
        this.itemList = res['data']
        console.log(this.itemList)
      })
    }else{
      this.itemList='';
    }
  }

  get f(){
    return this.icuform.controls;
  }

}
