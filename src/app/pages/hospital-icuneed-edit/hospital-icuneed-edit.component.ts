import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ApiService} from  './../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-hospital-icuneed-edit',
  templateUrl: './hospital-icuneed-edit.component.html',
  styleUrls: ['./hospital-icuneed-edit.component.scss']
})
export class HospitalIcuneedEditComponent implements OnInit {

  itemCategory:any;
  cat_obj:any;
  itemList:any;
  successform:any;
  userDetails:any;
  hospital_id:any;
  documentVerify:any;
  documentUploadMsg:any;
  urgencyicuneedDataList:any=[];
  icu_id:any;

  icuform = new FormGroup({
    
    item_category: new FormControl('', Validators.required),
    item_list: new FormControl('', Validators.required),
    urgency_icuneed: new FormControl('', Validators.required),
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

    this.route.params.subscribe(params =>{
      if(params && params.id){
        console.log(params.id)
        // this.isEditScreen=true

        this.icu_id= params.id;
        console.log('icu',this.icu_id)
        this.apiService.hospitalsIcuItemEdit(this.icu_id).subscribe(res=>{
          if(res['success']){
            let item_data = res['data'][0]
            console.log(item_data);
            this.cat_obj={"category_id":item_data.category_id}
            this.apiService.hospitalItemListing(this.cat_obj).subscribe(res=>{
              this.itemList = res['data']
              console.log(this.itemList)
            })
            
            // console.log(item_data.title);
            this.icuform.patchValue({
              "item_category":item_data.category_id,
              "device_in_use": item_data.device_in_use,
              "device_need_perday": item_data.device_need_perday,
              "device_not_use": item_data.device_not_use,
              "item_list": item_data.item_id,
              "urgency_icuneed": item_data.urgency_icuneed
            });
            this.icuform.updateValueAndValidity();
          }
        });
      }
    })

    this.apiService.getUserDetails(userdata).subscribe(res=>{
      let userDataResult = res['data'][0]
      this.documentVerify = userDataResult.admin_verify_status;
      this.documentUploadMsg = (userDataResult.document==null || userDataResult.document=='') ? 'Please complete hospital verification' : 'Hospital ID verification pending';
    })

    this.apiService.hospitalCategoryListing().subscribe(res=>{
      this.itemCategory = res['data']
      console.log(this.itemCategory)
    })
    this.apiService.hospitalsIcuItemListing(this.userDetails.id).subscribe(res=>{
      this.hospital_id = res['data'][0]
    })
    this.getUrgencyicuneedDataList();

  }

  selectCategory(catid){
    console.log('catidvalue',catid.value)
    
    if(catid){
      this.cat_obj={"category_id":catid.value}
      console.log(this.cat_obj);
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
    console.log(this.icuform.getRawValue());
    if(this.icuform.valid){
      var formvalue = this.icuform.getRawValue()
      // formvalue.hospital_item_cat_id=this.hospitalItemCatId
      // formvalue.hospital_required_items=this.hospitalItems
      formvalue.user_id=this.userDetails.id
      
      formvalue.id=this.icu_id
      console.log(formvalue);
    
      this.apiService.hospitalItemUpdate(formvalue).subscribe(res=>{
        console.log(res['data'])
        this.successform = 'Successfully Updated';
        // this.router.navigateByUrl('/pages/hospital-ICU-need-list')
      })
      console.log('asdvalid');

    }else{
      this.icuform.markAllAsTouched();
    }
  }

  getUrgencyicuneedDataList(){
    this.urgencyicuneedDataList =[
      {id:"Emergent",value:"Emergent (no alternatives available, unable to meet current need)"}, 
      {id:"Urgent",value:"Urgent (able to meet current need, >95% of supply in use)"}, 
      {id:"Critical",value:"Critical (able to meet current need, >90% of supply in use)"}, 
      {id:"High Risk",value:"High Risk (able to meet current need, >80% of supply in use)"}, 
      {id:"Medium Risk",value:"Medium Risk (>70% of supply in use)"}, 
      {id:"Low Risk",value:"Low Risk (<70% of supply in use)"}
    ]
    console.log(this.urgencyicuneedDataList);
  }

}
