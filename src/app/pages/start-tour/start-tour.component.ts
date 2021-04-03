import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'ngx-start-tour',
  templateUrl: './start-tour.component.html',
  styleUrls: ['./start-tour.component.scss']
})
export class StartTourComponent implements OnInit {
  userDetails:any;
  constructor(private apiService:ApiService,
    private router: Router,
    private route: ActivatedRoute) { this.userDetails = JSON.parse(localStorage.getItem("userData"));}

  ngOnInit(): void {
    let user_id = this.userDetails.id
    let formdata = new FormData();
    formdata.append("tourguide_status","0");
    this.apiService.updateUserDetails(formdata,user_id).subscribe(res=>{
      console.log('success',res);
      if(res['success']){
        let obj ={
          "user_id":this.userDetails.id
        }
        console.log('obj',obj);
        this.apiService.getUserDetails(obj).subscribe(res=>{
          localStorage.setItem("userData",JSON.stringify(res['data'][0]));


          let userDataNew = JSON.parse(localStorage.getItem("userData"));
          this.router.navigateByUrl('/pages/forms/inputs');
          console.log('userDetails',userDataNew);

        })
      }
    })
    console.log('testupdate');
  }

}
