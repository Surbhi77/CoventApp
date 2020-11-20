import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, startWith, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public baseAPi = "http://134.209.68.96:9700/frontend/";

  constructor(private http:HttpClient) {

  }

  public login(obj){
    return this.http.post(this.baseAPi+'login',obj);
  }
  
  public register(obj){
    return this.http.post(this.baseAPi+'signup',obj);
  }
}