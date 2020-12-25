import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ApiService} from  './../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-add-sliders',
  templateUrl: './add-sliders.component.html',
  styleUrls: ['./add-sliders.component.scss']
})
export class AddSlidersComponent implements OnInit {

  constructor(private toastr: ToastrService,
    private fb:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService:ApiService) { }

  icuform = new FormGroup({    
    heading: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    button_text: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    
  }

  get f(){
    return this.icuform.controls;
  }

}
