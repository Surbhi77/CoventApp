import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {ApiService} from './../services/api.service';
@Component({
  selector: 'ngx-innovator-listing',
  templateUrl: './innovator-listing.component.html',
  styleUrls: ['./innovator-listing.component.scss']
})
export class InnovatorListingComponent implements OnInit {
  categoryId: any;
  innovatorListing:any=[];
  imageBasePath:any='http://localhost:9700/'

  constructor(private router:Router,
    private apiService:ApiService,
    private activatedRoute:ActivatedRoute) { }

    ngOnInit(): void {
      this.categoryId = this.activatedRoute.snapshot.params['id'];
      console.log(this.categoryId);
      this.getCategoryListing()
    }
  
    getCategoryListing(){
      let obj={
        category_id:this.categoryId
      }
      this.apiService.getInnovationListing(obj).subscribe(res=>{
        console.log(res);
        if(res['success']){
          this.innovatorListing = res['data']
        }
      })
    }

    openDetails(item){
      this.router.navigateByUrl('/library-details/'+item.device_data_id);
      return false;
    }

}
