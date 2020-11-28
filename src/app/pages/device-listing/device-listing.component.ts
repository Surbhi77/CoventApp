import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ApiService} from  './../../services/api.service';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { V, F } from '@angular/cdk/keycodes';
import { FooterComponent } from 'app/@theme/components';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'ngx-device-listing',
  templateUrl: './device-listing.component.html',
  styleUrls: ['./device-listing.component.scss']
})
export class DeviceListingComponent implements OnInit {

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  devices:any;
  subCatDevices:any;
  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  countries: any;
  linearMode:boolean=false;
  fourthForm: FormGroup;
  fifthForm: FormGroup;
  instructionFile: any=[];
  materialFile: any=[];
  deviceFile: any=[];
  complianceArray: any=[];
  deviceCompliance: any=[];
  deviceCharacteristics: any=[];
  characteristicsArray: any=[];

  constructor(private toastr: ToastrService,private fb:FormBuilder,
              private router: Router,private apiService:ApiService) 
  {
    this.firstForm = fb.group({
      device_name:new FormControl('',[Validators.required]),
      device_cat:new FormControl('',[Validators.required]),
      device_type:new FormControl('',[Validators.required]),
      reusable:new FormControl('',[Validators.required]),
      autoclavable:new FormControl('',[Validators.required]),
      ac_powered:new FormControl('',[Validators.required])
    });

    this.secondForm = fb.group({
      battery_powered:new FormControl('',[Validators.required]),
      power_consumption:new FormControl('',[Validators.required]),
      unit_cost:new FormControl('',[Validators.required]),
      required_investment:new FormControl('',[Validators.required]),
      dev_stage:new FormControl('',[Validators.required]),
      clinical_stage:new FormControl('',[Validators.required]),
    });

    this.thirdForm = fb.group({
      regulatory_stage:new FormControl('',[Validators.required]),
      regulatory_approvals:new FormControl('',[Validators.required]),
      country:new FormControl('',[Validators.required]),
      website_link:new FormControl('',[Validators.required]),
      materials:new FormControl('',[Validators.required]),
      manufacturers:new FormControl('',[Validators.required])
    })

    this.fourthForm = fb.group({
      design_files:new FormControl('',[Validators.required]),
      training_documents:new FormControl('',[Validators.required]),
      related_publications:new FormControl('',[Validators.required]),
      device_image:new FormControl('',[Validators.required]),
      device_videos:new FormControl('',[Validators.required]),
      device_characteristics:new FormControl('',[Validators.required])
    });

    this.fifthForm = fb.group({
      standard_compliances:new FormControl('',[Validators.required]),
      innovator_type:new FormControl('',[Validators.required]),
      use_instructions:new FormControl('',[Validators.required])

    })

  }

  ngOnInit() {
    this.apiService.getDeviceListing().subscribe(res=>{
      this.devices=res['data']
    });
    
    this.apiService.getCountryListing().subscribe(res=>{
      this.countries=res['data']
    });

    // this.firstForm = this.fb.group({
    //   firstCtrl: ['', Validators.required],
    // });

    // this.secondForm = this.fb.group({
    //   secondCtrl: ['', Validators.required],
    // });

    // this.thirdForm = this.fb.group({
    //   thirdCtrl: ['', Validators.required],
    // });
  }

  get f(){
    return this.firstForm.controls;
  }

  get g(){
    return this.secondForm.controls;
  }

  get h(){
    return this.thirdForm.controls;
  }

  get i(){
    return this.fourthForm.controls;
  }

  get j(){
    return this.fifthForm.controls;
  }

  onFirstSubmit() {
    console.log(this.firstForm.valid)
    if(!this.firstForm.valid){
      this.firstForm.markAllAsTouched();
    }else{

    }
    
  }

  deviceCatChange(id){
    this.apiService.getCompliance(id).subscribe(res=>{
      this.deviceCompliance = res['data'][0]['compliance_data'].split(',');
      console.log(this.deviceCompliance)
    });
    this.apiService.getCharacteristics(id).subscribe(res=>{
      this.deviceCharacteristics = res['data'][0]['characteristics_data'].split(',');
      console.log(this.deviceCharacteristics)
    })
  }

  onDeviceCharacteristics($event){
    if($event.checked) {
      this.characteristicsArray.push($event.source.value);
      this.fourthForm.patchValue({
        'device_characteristics':this.characteristicsArray.toString()
      });
      this.fourthForm.updateValueAndValidity();
      console.log(this.fourthForm.value.standard_compliances)
    } else {
      let index = this.characteristicsArray.indexOf($event.source.value);
      this.characteristicsArray.splice(index,1);
      if(this.characteristicsArray.length == 0){
        this.fourthForm.patchValue({
          'device_characteristics':''
        });
        this.fourthForm.updateValueAndValidity();
        console.log(this.fourthForm.value.standard_compliances)
      }else{
        this.fourthForm.patchValue({
          'device_characteristics':this.characteristicsArray.toString()
        });
        this.fourthForm.updateValueAndValidity();
        console.log(this.fourthForm.value.device_characteristics)
      }
    }


  }

  onChangeCompliance($event){

      //console.log($event.source.value)
      if($event.checked) {
        this.complianceArray.push($event.source.value);
        this.fifthForm.patchValue({
          'standard_compliances':this.complianceArray.toString()
        });
        this.fifthForm.updateValueAndValidity();
        console.log(this.fifthForm.value.standard_compliances)
      } else {
        let index = this.complianceArray.indexOf($event.source.value);
        this.complianceArray.splice(index,1);
        if(this.complianceArray.length == 0){
          this.fifthForm.patchValue({
            'standard_compliances':''
          });
          this.fifthForm.updateValueAndValidity();
          console.log(this.fifthForm.value.standard_compliances)
        }else{
          this.fifthForm.patchValue({
            'standard_compliances':this.complianceArray.toString()
          });
          this.fifthForm.updateValueAndValidity();
          console.log(this.fifthForm.value.standard_compliances)
        }
      }
  

  }

  onInstructionFileChange(event){
    //console.log($event)
    for (var i = 0; i < event.target.files.length; i++) { 
      this.instructionFile.push(event.target.files[i]);
    }
  }

  onMaterialFileChange($event){
    for (var i = 0; i < $event.target.files.length; i++) { 
      this.materialFile.push($event.target.files[i]);
    }
  }

  onDeviceFileChange($event){
    for (var i = 0; i < $event.target.files.length; i++) { 
      this.deviceFile.push($event.target.files[i]);
    }
  }
  
  onSecondSubmit() {
    if(!this.secondForm.valid){
      this.secondForm.markAllAsTouched();
    }else{

    }
    
  }

  onThirdSubmit() {
    if(!this.thirdForm.valid){
      this.thirdForm.markAllAsTouched();
    }else{

    }
  }

  onFourthSubmit(){
    if(!this.fourthForm.valid){
      this.fourthForm.markAllAsTouched();
    }else{

    }
  }

  onFifthSubmit(){
    console.log(localStorage.getItem("userData"));
    let userDetails = JSON.parse(localStorage.getItem("userData"));
    
    if(!this.fifthForm.valid){
      this.fifthForm.markAllAsTouched();
    }else{
      
      let formdata = new FormData();
      formdata.append('device_user_id',userDetails.id);
      formdata.append('device_name',this.firstForm.value.device_name);
      //formdata.append('device_cat',this.firstForm.value.device_cat);
      formdata.append('device_category',this.firstForm.value.device_cat);
      formdata.append('device_type',this.firstForm.value.device_type);
      formdata.append('device_reusable',this.firstForm.value.reusable);
      formdata.append('device_autoclavable',this.firstForm.value.autoclavable);
      formdata.append('device_ac_powered',this.firstForm.value.ac_powered);
      formdata.append('device_battery_powered',this.secondForm.value.battery_powered);
      formdata.append('device_power_consumption',this.secondForm.value.power_consumption);
      formdata.append('device_unit_cost',this.secondForm.value.unit_cost);
      formdata.append('device_required_investment',this.secondForm.value.required_investment);
      formdata.append('device_development_stage',this.secondForm.value.dev_stage);
      formdata.append('device_clinical_stage',this.secondForm.value.clinical_stage);
      formdata.append('device_regulatory_stage',this.thirdForm.value.device_regulatory_stage);
      formdata.append('device_regulatory_approvals',this.thirdForm.value.regulatory_approvals);
      formdata.append('device_country',this.thirdForm.value.country);
      formdata.append('device_project_link',this.thirdForm.value.website_link);
      formdata.append("device_materials", this.materialFile[0]);
      formdata.append('device_manufactures',this.thirdForm.value.manufacturers);
      formdata.append('device_test_data','abc');
      formdata.append('device_design_file',this.fourthForm.value.design_files);
      formdata.append('device_training_document',this.fourthForm.value.training_documents);
      formdata.append('device_related_publications',this.fourthForm.value.related_publications);
      formdata.append('device_videos',this.fourthForm.value.device_videos);
      for (var i = 0; i < this.deviceFile.length; i++) { 
        formdata.append("device_image", this.deviceFile[i]);
      }
      formdata.append("device_characterstics",this.fourthForm.value.device_characteristics);
      formdata.append("device_standard_compilance",this.fifthForm.value.standard_compliances);
      formdata.append("device_innovator_type",this.fifthForm.value.innovator_type);
      formdata.append("device_usage_instruction",this.instructionFile[0]);

      this.apiService.addInnovatorData(formdata).subscribe(res=>{
        this.toastr.success("Device data added successfully");
        this.firstForm.reset();
        this.secondForm.reset();
        this.thirdForm.reset();
        this.fourthForm.reset();
        this.fifthForm.reset();
      },error=>{
        this.toastr.error("Please try after some time")
      })
      



      
      //formdata.append()
    }
  }

  deviceChange($event){
    console.log($event);
    let cat = $event;
    this.apiService.getSubcategoryListing(cat).subscribe(res=>{
      this.subCatDevices = res['data']
    })
  }

}
