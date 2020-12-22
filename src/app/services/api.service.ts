import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public baseAPi = environment.apiUrl+"frontend/";
  public secureApi=environment.apiUrl+"secureApi/";
  public authApi= environment.apiUrl+"api/";

  constructor(private http:HttpClient) {

  }

  public login(obj){
    return this.http.post(this.authApi+'login',obj);
  }

  public getInnovatorList() {
    return this.http.get(this.secureApi+'innovator-list')
  }
  
  public register(obj){
    return this.http.post(this.authApi+'signup',obj);
  }

  public getDeviceListing(){
    return this.http.get(this.baseAPi+'device-category')
  }

  public blockDevice(id){
    return this.http.get(this.secureApi+'block-device/'+id)
  }

  public unBlockDevice(id){
    return this.http.get(this.secureApi+'unblock-device/'+id)
  }

  public blockUser(id){
    return this.http.get(this.secureApi+'block-user/'+id)
  }

  public unBlockUser(id){
    return this.http.get(this.secureApi+'unblock-user/'+id)
  }

  public getUserInnovatorList(){
    return this.http.get(this.secureApi+'user-innovator-list')
  }

  

  public getReviewerList(){
    return this.http.get(this.secureApi+'reviewer-list')
  }

  public getSubcategoryListing(id){
    return this.http.get(this.baseAPi+'device-sub-category/'+id);
  }

  public getDeviceCategoryListing(){
    return this.http.get(this.baseAPi+'device-category')
  }

  public createCompliance(obj){
    return this.http.post(this.secureApi+'create-compliance',obj)
  }

  public updateCompliance(obj){
    return this.http.post(this.secureApi+'update-compliance',obj)
  }

  public updateCharacteristics(obj){
    return this.http.post(this.secureApi+'update-characteristics',obj)
  }

  public createCharacteristics(obj){
    return this.http.post(this.secureApi+'create-characteristics',obj)
  }

  public complianceListing(){
    return this.http.get(this.secureApi+'Compliance-listing')
  }

  public characteristicListing(){
    return this.http.get(this.secureApi+'Characteristics-listing')
  }

  public complianceDetail(id){
    return this.http.get(this.secureApi+'Compliance-details/'+id)
  }

  public characteristicDetail(id){
    return this.http.get(this.secureApi+'Characteristics-details/'+id)
  }

  public complianceDelete(id){
    return this.http.get(this.secureApi+'Compliance-delete/'+id)
  }

  public characteristicsDelete(id){
    return this.http.get(this.secureApi+'Characteristics-delete/'+id)
  }

  public makeFeaturedUnfeatured(obj){
    return this.http.post(this.secureApi+'add-featured-listing',obj)
  }

  public makeFeaturedCategory(obj){
    return this.http.post(this.secureApi+'add-featured-category',obj)
  }

  public getLatestInnovator(){
    return this.http.get(this.secureApi+'latest-innovatorlist')
  }

  public getLatestViewInnovator(){
    return this.http.get(this.secureApi+'latest-viewinnovatorlist')
  }

  public monthlyAddedCount(){
    return this.http.get(this.secureApi+'/monthlyadded-innovatorscount')
  }

  public monthlyViewedCount(){
    return this.http.get(this.secureApi+'/monthlyviewed-innovatorscount')
  }

  /**** by #as ****/
  public getHospitalsUserlist(){
    return this.http.get(this.secureApi+'get-userlisting/3')
  }
  public getHospitalslist(){
    return this.http.get(this.secureApi+'hospitals-list')
  }
  public deleteHospital(id){
    return this.http.get(this.secureApi+'delete-hospital/'+id)
  }
  public getHospitalDetail(id){
    return this.http.get(this.secureApi+'hospital-detail/'+id)
  }
  public getDeviceInnovatorDetail(id){
    return this.http.get(this.secureApi+'get-deviceinnovator-detail/'+id)
  }

  public verifyhospitaluserdoc(id,type){
    return this.http.get(this.secureApi+'verify-hospital-user/'+id+'/'+type)
  }

  public latestAddItems(){
    return this.http.get(this.secureApi+'admin-hospital-dashboard')
  }
  public monthlyItemsgraph(){
    return this.http.get(this.secureApi+'monthlyadded-hospital-item')
  }
  public weeklyItemsgraph(){
    return this.http.get(this.secureApi+'weeklyadded-hospital-item')
  }
  public getIcuNeedHospitalslist(){
    return this.http.get(this.secureApi+'admin-icuneed-hospital-dashboard')
  }
  /********/
  // public addInnovatorData(obj){
  //   return this.http.post(this.baseAPi+'add-innovator-data',obj);
  // }

  // public getListing(obj){
  //   return this.http.post(this.baseAPi+'innovator-list',obj)
  // }

  // public getCompliance(id){
  //   return this.http.get(this.baseAPi+'covent_compliance/'+id);
  // }

  // public getCharacteristics(id){
  //   return this.http.get(this.baseAPi+'covent_characteristics/'+id)
  // }


}