import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ApiService} from  './../../services/api.service';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-characteristics',
  templateUrl: './characteristics.component.html',
  styleUrls: ['./characteristics.component.scss']
})
export class CharacteristicsComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  category:any=[];
  subCatDevices:any=[];
  isEditScreen:boolean=false;
  characteristicId:any;

  constructor(private toastr: ToastrService,
    private fb:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService:ApiService) {

   }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      console.log(params);
      if(params && params.id){
        this.isEditScreen=true

        this.characteristicId= params.id;
        this.getDetails();
      }
      
      // this.orderId = params.id;
      // this.getOrderDetails()
    })
    this.apiService.getDeviceCategoryListing().subscribe(res=>{
      if(res['success']){
        this.category = res['data']
      }
    });
    //this.apiService.getSubcategoryListing()
    this.form = this.fb.group({
      category_id: new FormControl('',[Validators.required]),
      sub_category_id: new FormControl('',[Validators.required]),
      characteristics_data: new FormControl('',[Validators.required])
    })
  }

  getDetails(){
    this.apiService.characteristicDetail(this.characteristicId).subscribe(res=>{
      console.log(res['data']);
      this.form.patchValue({
        "category_id":res['data'][0].category_id,
        "characteristics_data":res['data'][0].characteristics_data
      });
      let data = res['data'][0].sub_category_id
      this.apiService.getSubcategoryListing(res['data'][0].category_id).subscribe(res=>{
        this.subCatDevices = res['data'];
        this.form.patchValue({
          "sub_category_id":data
        });
        this.form.updateValueAndValidity()
      })

      this.form.updateValueAndValidity()
    })
  }

  deviceChange($event){
    console.log($event);
    let cat = $event;
    this.apiService.getSubcategoryListing(cat).subscribe(res=>{
      this.subCatDevices = res['data']
    })
  }

  saveComplianceData(){
    console.log(this.form.getRawValue());
    let obj = {
      "category_id":this.form.value.category_id,
      "sub_category_id":this.form.value.sub_category_id,
      "characteristics_data":this.form.value.characteristics_data
    };
    if(!this.isEditScreen){
      this.apiService.createCharacteristics(obj).subscribe(res=>{
        //if()
        if(res['data']['existingId']){
          let url = '/pages/edit-characteristics/'+res['data']['existingId'];
          console.log(url)
          this.toastr.error("Compliance already created for this category and subcategory consider editing it")
          setTimeout(() => {
            this.router.navigateByUrl(url)
          }, 2000);
        }
        if(res['data']['insertId']){
          this.toastr.success("Successfully created");
          this.router.navigateByUrl('/pages/characteristic-listing')
        }
        console.log(res['data'])
      })
    }else{
      obj['characteristics_id']=this.characteristicId;
      this.apiService.updateCharacteristics(obj).subscribe(res=>{
        //if()
        if(res['success']){
          this.toastr.success("Successfully updated")
          this.router.navigateByUrl('/pages/characteristic-listing')
        }
      })
    }
    
  }


}
