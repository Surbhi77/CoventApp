import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
import {ApiService} from  './../../services/api.service';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-question-listing',
  templateUrl: './question-listing.component.html',
  styleUrls: ['./question-listing.component.scss']
})
export class QuestionListingComponent implements OnInit {

  /*settings = {
    actions: {
      add: false,
      position: 'right'
      },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      editConfirm:true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    view:{
      viewButtonContent: '<i class="nb-trash"></i>',
    },
    columns: {
      // id: {
      //   title: 'question_id',
      //   type: 'number',
      //   filter: false
      // },
      question: {
        title: 'Question',
        type: 'string',
        filter: false
      },
      answer: {
        title: 'Answer',
        type: 'string',
        filter: false
      },
      user_name: {
        title: 'Username',
        type: 'string',
        filter: false
      },
      created_at: {
        title: 'Create Date',
        type: 'date',
        filter: false
      },
    },
  };*/

  source: LocalDataSource = new LocalDataSource();
  questionListing: any;
  innovator_Id:any;
  dtOptions:any;

  constructor(private apiService:ApiService,private service: SmartTableData,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      processing: true
    }
    this.route.params.subscribe(params =>{
      console.log(params);
      if(params && params.innovator_id){
        
        this.innovator_Id= params.innovator_id;
      }
      
    })
    console.log(this.innovator_Id);
    let userDetails = JSON.parse(localStorage.getItem("userData"));
    let obj={
      "user_id":userDetails.id
    }
    console.log(obj);
    this.apiService.getQuestionList(this.innovator_Id).subscribe(res=>{
      if(res["success"]){
        this.questionListing = res['data'];
        console.log(this.questionListing);
        this.questionListing.forEach((currentValue, index) => {
          currentValue.s_no = index+1
        });
        this.source.load(this.questionListing)
      }else{
        this.questionListing = [];
      }
    })
    
    console.log("success")
  }


  onDeleteConfirm(event): void {
    console.log(event)
    if(window.confirm('Are you sure you want to delete')) {
      //event.confirm.reject();
      
      // console.log(sno);
      this.apiService.deleteQuestion(event.id).subscribe(res=>{
        if(res['success']){
          console.log(res['success']);
          var newArr = this.questionListing
          // console.log(newArr);
          // this.questionListing.forEach((currentValue, index) => {
          //   currentValue.s_no = index+1
          // });

          let index = newArr.indexOf(event);
          newArr.splice(index,1);
          // console.log(sno);
          // console.log(newArr);
          // this.deviceListing
          //this.source.update(this.deviceListing,newArr)
          // this.source.refresh()
          // event.confirm.resolve();
        }
      })
    }
    // if (window.confirm('Are you sure you want to delete?')) {
    //   event.confirm.resolve();
    // } else {
    //   event.confirm.reject();
    // }
  }

  
  

}
