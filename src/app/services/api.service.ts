import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public baseAPi = "http://localhost:9700/frontend/";

  constructor(private http:HttpClient) {

  }

  public login(obj){
    return this.http.post(this.baseAPi+'login',obj);
  }
  
  public register(obj){
    return this.http.post(this.baseAPi+'signup',obj);
  }

  public getDeviceListing(){
    return this.http.get(this.baseAPi+'device-category')
  }

  public getSubcategoryListing(id){
    return this.http.get(this.baseAPi+'device-sub-category/'+id);
  }

  public getCountryListing(){
    return this.http.get(this.baseAPi+'country-list')
  }

  public addInnovatorData(obj){
    return this.http.post(this.baseAPi+'add-innovator-data',obj);
  }

  public getListing(obj){
    return this.http.post(this.baseAPi+'innovator-list',obj)
  }

  public getCompliance(id){
    return this.http.get(this.baseAPi+'covent_compliance/'+id);
  }

  public getCharacteristics(id){
    return this.http.get(this.baseAPi+'covent_characteristics/'+id)
  }

  public deleteDevice(id){
    return this.http.get(this.baseAPi+'device_delete/'+id)
  }

  public getInnovationListing(obj){
    return this.http.post(this.baseAPi+'innovator-list',obj)
  }

  public getInnovatorDetail(id){
    return this.http.get(this.baseAPi+'/innovator-detail/'+id)
  }
}