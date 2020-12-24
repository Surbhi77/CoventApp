import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ApiService} from  './../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-map-setting',
  templateUrl: './map-setting.component.html',
  styleUrls: ['./map-setting.component.scss']
})
export class MapSettingComponent implements OnInit {

  constructor(private toastr: ToastrService,
    private fb:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService:ApiService) { }

  form = new FormGroup({
    show_hisory: new FormControl('', [Validators.required])
  });
  successform:any;

  ngOnInit(): void {
    this.apiService.getMapSetting().subscribe(res=>{
      if(res['success']){
        let mapsettingdata = res['data'][0]
        // this.mapvalue = mapsettingdata.shfield_valueow_hisory;
        this.form.patchValue({
          "show_hisory":mapsettingdata.field_value
        });
        this.form.updateValueAndValidity();
      }
    })
  }

  get f(){
    return this.form.controls;
  }

  onSubmit(){
    
    if(this.form.valid){
      var formvalue = this.form.getRawValue()
      formvalue.field_name = 'map_setting';
      formvalue.field_value = formvalue.show_hisory;
      console.log(formvalue);
    
      this.apiService.updateMapSetting(formvalue).subscribe(res=>{
        console.log(res['data'])
        this.successform = 'Successfully Updated';
      })
      console.log('asdvalid');
    }else{
      console.log('else');
      this.form.markAllAsTouched();
    }
    
  }

}
