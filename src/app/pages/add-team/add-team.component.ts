import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ApiService} from  './../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {environment} from 'environments/environment';

@Component({
  selector: 'ngx-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})

export class AddTeamComponent implements OnInit {

  fileuploaded:any;
  assetBasePath:any=environment.imageUrl
  url:any;
  constructor(private toastr: ToastrService,
    private fb:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService:ApiService) { }

  teamform = new FormGroup({    
    image: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

  get f(){
    return this.teamform.controls;
  }

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

  onSubmit(){
    console.log('asd');
    if(this.teamform.valid){
      // var formdata = this.teamform.getRawValue()
      let formdata = new FormData()
      // formdata.image = this.fileuploaded;
      formdata.append('image',this.fileuploaded);
      formdata.append('name',this.teamform.value.name);
      formdata.append('description',this.teamform.value.description);

      // console.log(this.userDetails.id,this.fileuploaded)
        // formdata.append('device_user_id',userDetails.id);
      // formvalue.hospital_required_items=this.hospitalItems
      // formvalue.user_id=this.userDetails.id
      
      // formvalue.hospital_id=this.hospital_id.id
      console.log(formdata);
    
      this.apiService.addTeamData(formdata).subscribe(res=>{
        console.log(res['data'])
        // this.successform = 'Successfully Updated';
        // this.userverifyform.reset();
        this.router.navigateByUrl('/pages/team-list')
      })
      console.log('asdvalid');

    }else{
      alert("here")
      this.teamform.markAllAsTouched();
    }
  }

  

}
