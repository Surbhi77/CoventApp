import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ApiService} from  './../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {environment} from 'environments/environment';

@Component({
  selector: 'ngx-hospital-user-verification',
  templateUrl: './hospital-user-verification.component.html',
  styleUrls: ['./hospital-user-verification.component.scss']
})
export class HospitalUserVerificationComponent implements OnInit {

  userDetails:any;
  successform:any;
  fileuploaded:any;
  url:any="";
  documentVerify:any;
  documentFile:any;
  assetBasePath:any=environment.imageUrl
  userverifyform = new FormGroup({
  
    document: new FormControl('', Validators.required),
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
      console.log('userDataResult',userDataResult);
      this.documentVerify = userDataResult.admin_verify_status;
      console.log(this.documentVerify);
      // this.documentFile = userDataResult.document;
      this.documentFile = this.assetBasePath+userDataResult.document;
    })
  }

  get f(){
    return this.userverifyform.controls;
  }


  onSubmit(){
    console.log('asd');
    if(this.userverifyform.valid){
      // var formvalue = this.userverifyform.getRawValue()
      let formdata = new FormData()
      formdata.append('document',this.fileuploaded);
      formdata.append('user_id',this.userDetails.id);
      console.log(this.userDetails.id,this.fileuploaded)
        // formdata.append('device_user_id',userDetails.id);
      // formvalue.hospital_required_items=this.hospitalItems
      // formvalue.user_id=this.userDetails.id
      
      // formvalue.hospital_id=this.hospital_id.id
      console.log(formdata);
    
      this.apiService.hospitalVerify(formdata).subscribe(res=>{
        console.log(res['data'])
        this.successform = 'Successfully Updated';
        this.userverifyform.reset();
        // this.router.navigateByUrl('/pages/hospital-ICU-need-list')
      })
      console.log('asdvalid');

    }else{
      alert("here")
      this.userverifyform.markAllAsTouched();
    }
  }

  // onDocFileChange($event){
  //   console.log($event.target.files);
  //   // for (var i = 0; i < $event.target.files.length; i++) { 
  //     this.fileuploaded = ($event.target.files[0]);
  //   // }
  // }
  



  onDocFileChange(event) {
    if (event.target.files && event.target.files[0]) {
       var reader = new FileReader();
       this.fileuploaded = event.target.files[0];
       reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
         this.url = event.target.result;
       }
     }
   }

}
