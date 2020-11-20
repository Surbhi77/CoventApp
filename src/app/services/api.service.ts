import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, startWith, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public baseAPi = "http://localhost:9700/api/";

  constructor(private http:HttpClient) {

  }

  public login(obj){
    return this.http.post(this.baseAPi+'login',obj);
  }

  public getUsers(){
    return this.http.get('http://localhost:9700/secureApi/user'); 
  }



  
}
