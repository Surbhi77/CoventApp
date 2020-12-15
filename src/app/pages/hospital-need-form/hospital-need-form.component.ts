import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ApiService} from  './../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-hospital-need-form',
  templateUrl: './hospital-need-form.component.html',
  styleUrls: ['./hospital-need-form.component.scss']
})
export class HospitalNeedFormComponent implements OnInit {

  itemCategory:any;
  itemList:any;
  typeOfFacility:any;
  electricitySource:any;
  oxygenFacility:any;
  categoryArr:any=[];
  hospitalItemCatId:any;
  itemArr:any=[];
  hospitalItems:any;
  userDetails:any;
  cat_obj:any;
  successform:any;

  form = new FormGroup({
    healthcare_facility_name: new FormControl('', [Validators.required]),
    email_address: new FormControl('', [Validators.required, Validators.email]),
    facility_location: new FormControl('', Validators.required),
    hospital_item_cat_id: new FormControl('', Validators.required),
    hospital_required_items: new FormControl('', Validators.required),
    phone_number: new FormControl('', Validators.required),
    type_of_facility: new FormControl('', Validators.required),
    electricity_source: new FormControl('', Validators.required),
    electricity_reliabile: new FormControl('', Validators.required),
    oxygen_distribution_facility: new FormControl('', Validators.required),
    healthcare_workers: new FormControl('', Validators.required),
    other_caregivers: new FormControl('', Validators.required),
    janitorial_staff: new FormControl('', Validators.required),
    ambulance_personnel: new FormControl('', Validators.required),
    biomedical_engineers: new FormControl('', Validators.required),
    critical_care_icu_beds: new FormControl('', Validators.required),
    critical_care_icu_patients: new FormControl('', Validators.required),
    hospital_beds: new FormControl('', Validators.required),
    hospital_patients: new FormControl('', Validators.required)
  });

  constructor(private toastr: ToastrService,
    private fb:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService:ApiService) { }

  ngOnInit(): void {
    console.log(localStorage.getItem("userData"));
    this.userDetails = JSON.parse(localStorage.getItem("userData"));
    // console.log(userDetails.id);
    this.typeOfFacility = ["Academic medical center", "Tertiary hospital", "Community hospital", "Field hospital","Outpatient clinic"]

    this.electricitySource = ["Central supply", "Generator only", "Solar", "None"]

    this.oxygenFacility = ["Pipeline oxygen","oxygen cylinders", "oxygen concentrators"]

    this.apiService.hospitalCategoryListing().subscribe(res=>{
      this.itemCategory = res['data']
      console.log(this.itemCategory)
    })
  }

  get f(){
    return this.form.controls;
  }

  selectCategory(catid,datavalue){
    console.log(catid)
    console.log(datavalue)
    if(datavalue==true){
      this.categoryArr.push(catid)
      this.hospitalItemCatId = this.categoryArr.toString()
    }else{
      let index = this.categoryArr.indexOf(catid);
      this.categoryArr.splice(index,1);
      
      if(this.categoryArr.length == 0){
        this.hospitalItemCatId = '';
      }else{
        this.hospitalItemCatId = this.categoryArr.toString()
      }
    }
    console.log(this.hospitalItemCatId);
    if(this.hospitalItemCatId!=''){
      this.cat_obj={"category_id":this.hospitalItemCatId}
      // console.log(this.cat_obj);
      this.apiService.hospitalItemListing(this.cat_obj).subscribe(res=>{
        this.itemList = res['data']
        console.log(this.itemList)
      })
    }else{
      this.itemList='';
    }
  }

  selectItems(itemId,datavalue){
    console.log(itemId)
    console.log(datavalue)
    if(datavalue==true){
      this.itemArr.push(itemId)
      this.hospitalItems = this.itemArr.toString()
    }else{
      let index = this.itemArr.indexOf(itemId);
      this.itemArr.splice(index,1);
      
      if(this.itemArr.length == 0){
        this.hospitalItems = '';
      }else{
        this.hospitalItems = this.itemArr.toString()
      }
    }
    // console.log(this.hospitalItems);
    // console.log(this.itemArr);
    
  }

  onSubmit(){
    console.log(this.form);
    if(this.form.valid){
      var formvalue = this.form.getRawValue()
      formvalue.hospital_item_cat_id=this.hospitalItemCatId
      formvalue.hospital_required_items=this.hospitalItems
      formvalue.user_id=this.userDetails.id
      console.log(formvalue);
    
      this.apiService.hospitalDataAdd(formvalue).subscribe(res=>{
        console.log(res['data'])
        this.successform = 'Successfully Updated';
      })
      console.log('asdvalid');
    }else{
      this.form.markAllAsTouched();
    }
    
  }

}