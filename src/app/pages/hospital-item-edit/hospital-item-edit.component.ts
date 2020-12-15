import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ApiService} from  './../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-hospital-item-edit',
  templateUrl: './hospital-item-edit.component.html',
  styleUrls: ['./hospital-item-edit.component.scss']
})
export class HospitalItemEditComponent implements OnInit {
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
  hospital_id:any;
  hospitalData:any;
  selectedCategory:any=[];
  selectedCategoryItems:any=[];

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
    this.route.params.subscribe(params =>{
      console.log(params);
      if(params && params.id){
        console.log(params.id)
        // this.isEditScreen=true

        this.hospital_id= params.id;
        this.apiService.getHospitalDetail(this.hospital_id).subscribe(res=>{
          if(res['success']){
            let hospital_data = res['data'][0]
            // console.log(hospital_data);
            this.hospitalData = hospital_data;
            this.cat_obj={"category_id":hospital_data.hospital_item_cat_id}
            // console.log(this.cat_obj);
            this.apiService.hospitalItemListing(this.cat_obj).subscribe(res=>{
              this.itemList = res['data']
              console.log(this.itemList)
            })
            // this.selectedCharacteristics=deviceDetails.device_characterstics.split(",");
            this.selectedCategory=hospital_data.hospital_item_cat_id.split(",");
            this.selectedCategoryItems=hospital_data.hospital_required_items.split(",");
            // console.log('selectedCategoryItems'+this.selectedCategoryItems);
            this.hospitalItems=hospital_data.hospital_required_items;
            this.hospitalItemCatId=hospital_data.hospital_item_cat_id;
            // console.log('hospitalItemCatId'+this.hospitalItemCatId);
            // console.log('hospitalItems'+this.hospitalItems);
            this.form.patchValue({
              "healthcare_facility_name":hospital_data.healthcare_facility_name,
              "email_address": hospital_data.email_address,
              "facility_location": hospital_data.facility_location,
              // "hospital_item_cat_id": hospital_data.hospital_item_cat_id,
              // "hospital_required_items": hospital_data.hospital_required_items,
              "phone_number": hospital_data.phone_number,
              "type_of_facility": hospital_data.type_of_facility,
              "electricity_source": hospital_data.electricity_source,
              "electricity_reliabile": hospital_data.electricity_reliabile,
              "oxygen_distribution_facility": hospital_data.oxygen_distribution_facility,
              "healthcare_workers": hospital_data.healthcare_workers,
              "other_caregivers": hospital_data.other_caregivers,
              "janitorial_staff": hospital_data.janitorial_staff,
              "ambulance_personnel": hospital_data.ambulance_personnel,
              "biomedical_engineers": hospital_data.biomedical_engineers,
              "critical_care_icu_beds": hospital_data.critical_care_icu_beds,
              "critical_care_icu_patients": hospital_data.critical_care_icu_patients,
              "hospital_beds": hospital_data.hospital_beds,
              "hospital_patients": hospital_data.hospital_patients
            });
            this.form.updateValueAndValidity();
          }
        });
        
        
      }
    })

    
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

  checkIfSelectCategory(value){
    // console.log(value)
    // value = '"'+value+'"';
    var index = this.selectedCategory.indexOf(value.toString());
    // console.log(value,this.selectedCharacteristics)
    // console.log(index)
    if(index<0){
      return false;
    }else{
      return true;
    }
  }

  checkIfSelectCategoryItem(value){
    // console.log(this.selectedCategoryItems)
    // value = '"'+value+'"';
    var index = this.selectedCategoryItems.indexOf(value);
    // console.log(value,this.selectedCharacteristics)
    // console.log(index)
    if(index<0){
      return false;
    }else{
      return true;
    }
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
      this.itemList = '';
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
    // console.log(this.form.getRawValue());
    if(this.form.valid){
      var formvalue = this.form.getRawValue()
      formvalue.hospital_item_cat_id=this.hospitalItemCatId
      formvalue.hospital_required_items=this.hospitalItems
      formvalue.user_id=this.userDetails.id
      formvalue.hospital_id=this.hospital_id
      console.log(formvalue);
    
      this.apiService.updateHospitalData(formvalue).subscribe(res=>{
        console.log(res['data'])
        this.successform = 'Successfully Updated';
      })
      console.log('asdvalid');
    }else{
      this.form.markAllAsTouched();
    }
    
  }

} 
