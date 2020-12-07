import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import {ApiService} from  './../../services/api.service';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();
  form: FormGroup = new FormGroup({});
  questionData: any;
  question_id:any;
  
  constructor(
    private apiService:ApiService,
    private fb:FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      console.log(params);
      if(params && params.question_id){
        
        this.question_id= params.question_id;
      }
      
    })

    this.apiService.getQuestionDetail(this.question_id).subscribe(res=>{
      if(res["success"]){
        this.questionData = res['data'][0];
        console.log(this.questionData);

        // this.source.load(this.questionData)
      }else{
        this.questionData = [];
      }
    })
    this.form = this.fb.group({
      answer: new FormControl('',[Validators.required])
    })
    console.log(this.question_id);
  }

  
  saveAnswerData(){
    console.log(this.form.value.answer);
    this.route.params.subscribe(params =>{
      console.log(params);
      if(params && params.question_id){
        
        this.question_id= params.question_id;
      }
      
    })
    let obj = {
      "answer":this.form.value.answer
    };
    this.apiService.updateQuestionAnswer(this.question_id,obj).subscribe(res=>{
        console.log(res);
      
    })
  }

}
