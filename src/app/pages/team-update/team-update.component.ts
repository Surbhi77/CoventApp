import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ApiService} from  './../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {environment} from 'environments/environment';

@Component({
  selector: 'ngx-team-update',
  templateUrl: './team-update.component.html',
  styleUrls: ['./team-update.component.scss']
})
export class TeamUpdateComponent implements OnInit {

  fileuploaded:any;
  assetBasePath:any=environment.imageUrl
  url:any;
  team_id:any;
  imagefile:any
  constructor(private toastr: ToastrService,
    private fb:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService:ApiService) { }

  teamform = new FormGroup({    
    // image: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      if(params && params.id){
        console.log(params.id)
        

        this.team_id= params.id;
        console.log('icu',this.team_id)
        this.apiService.teamDetailData(this.team_id).subscribe(res=>{
          if(res['success']){
            let item_data = res['data'][0]
            console.log(item_data);
            this.url = this.assetBasePath+item_data.image
            this.teamform.patchValue({
              "name":item_data.name,
              "description": item_data.description
            });
            this.teamform.updateValueAndValidity();
          }
        });
      }
    })
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

      let formdata = new FormData()
      if(this.fileuploaded && this.fileuploaded!=''){
      formdata.append('image',this.fileuploaded);
      }
      formdata.append('name',this.teamform.value.name);
      formdata.append('description',this.teamform.value.description);
      formdata.append('id',this.team_id);
      console.log(formdata);
    
      this.apiService.updateTeamData(formdata).subscribe(res=>{
        console.log(res['data'])
        this.router.navigateByUrl('/pages/team-list')
      })
      console.log('asdvalid');

    }else{
      alert("here")
      this.teamform.markAllAsTouched();
    }
  }

}
