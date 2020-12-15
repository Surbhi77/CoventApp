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
  userDetails:any;
  hospital_id:any;
  documentVerify:any;
  documentUploadMsg:any;

  icuform = new FormGroup({
    
    item_category: new FormControl('', Validators.required),
    item_list: new FormControl('', Validators.required),
    device_in_use: new FormControl('', Validators.required),
    device_not_use: new FormControl('', Validators.required),
    device_need_perday: new FormControl('', Validators.required)
  });

  constructor(private toastr: ToastrService,
    private fb:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService:ApiService) { }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem("userData"));
    let userdata = {"user_id":this.userDetails.id}
    this.apiService.getUserDetails(userdata).subscribe(res=>{
      let userDataResult = res['data'][0]
      // console.log(this.itemCategory)
      this.documentVerify = 1;//userDataResult.admin_verify_status;
      this.documentUploadMsg = (userDataResult.document==null || userDataResult.document=='') ? 'Please Upload File' : 'Hospital ID verification pending';
      // console.log(userDataResult);
      // console.log(this.documentUploadMsg+" document "+userDataResult.document)
    })

    this.apiService.hospitalCategoryListing().subscribe(res=>{
      this.itemCategory = res['data']
      // console.log(this.itemCategory)
    })
    this.apiService.hospitalsIcuItemListing(this.userDetails.id).subscribe(res=>{
      this.hospital_id = res['data'][0]
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

  onSubmit(){
    console.log('asd');
    if(this.icuform.valid){
      var formvalue = this.icuform.getRawValue()
      // formvalue.hospital_item_cat_id=this.hospitalItemCatId
      // formvalue.hospital_required_items=this.hospitalItems
      formvalue.user_id=this.userDetails.id
      
      formvalue.hospital_id=this.hospital_id.id
      console.log(formvalue);
    
      this.apiService.hospitalItemData(formvalue).subscribe(res=>{
        console.log(res['data'])
        this.successform = 'Successfully Updated';
        this.router.navigateByUrl('/pages/hospital-ICU-need-list')
      })
      console.log('asdvalid');

    }else{
      this.icuform.markAllAsTouched();
    }
  }

} 
