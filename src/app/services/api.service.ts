import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Subject,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  success(arg0: string, arg1: boolean) {
    throw new Error('Method not implemented.');
  }

  public baseAPi = environment.apiUrl+"frontend/";
  userLoggedOutorIn$ = new Subject<any>();
  userDataUpdated$ = new Subject<any>();

  constructor(private http:HttpClient) {

  }

  public forgotPassword(obj){
    return this.http.post(this.baseAPi+'forgot-password',obj)
  }

  public verifyCode(obj){
    return this.http.post(this.baseAPi+'verify-code',obj)
  }
  public updatePassword(obj){
    return this.http.post(this.baseAPi+'update-newpassword',obj)
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

  public updateInnovatorData(obj,id){
    return this.http.put(this.baseAPi+'update-innovator-data/'+id,obj)
  }

  public getListing(obj){
    return this.http.post(this.baseAPi+'innovator-list',obj)
  }

  public getReviewListing(obj){
    return this.http.get(this.baseAPi+'get-allreviewlist/'+obj)
  }

  public reviewDetail(obj){
    return this.http.get(this.baseAPi+'reviewdetail/'+obj)
  }

  public updateReviewData(obj) {
    return this.http.post(this.baseAPi+'update-review/',obj)
  }

  public getReviewListingByInnovator(obj){
    return this.http.get(this.baseAPi+'get-reviewlist/'+obj)
  }

  public getQuestionList(obj){
    return this.http.get(this.baseAPi+'innovator-questionlist/'+obj)
  }

  public getQuestionDetail(obj){
    return this.http.get(this.baseAPi+'questiondetail/'+obj)
  } 
  public updateQuestionAnswer(obj,body){
    return this.http.put(this.baseAPi+'innovator-questionupdate/'+obj,body)
  } 
  
  public deleteQuestion(obj){
    return this.http.get(this.baseAPi+'questiondelete/'+obj)
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

  public getReviewListingByUser(id){
    return this.http.get(this.baseAPi+'get-allreviewlist/'+id)
  }

  public getInnovationListing(obj){
    return this.http.post(this.baseAPi+'innovator-list',obj)
  }

  public getInnovatorDetail(id){
    return this.http.get(this.baseAPi+'/innovator-detail/'+id)
  }

  public addReview(obj){
    return this.http.post(this.baseAPi+'/add-review',obj)
  }

  public addQuestion(obj){
    return this.http.post(this.baseAPi+'/add-question',obj)
  }

  public getDeviceDetail(id){
    return this.http.get(this.baseAPi+'/innovator-detail/'+id)
  }

  public getUserDetails(obj){
    return this.http.post(this.baseAPi+'/user-profile',obj)
  }

  public updateUserDetails(obj,id){
    return this.http.put(this.baseAPi+'/update-profile/'+id,obj)
  }

  public changePassword(obj){
    return this.http.post(this.baseAPi+'/change-password',obj)
  }

  public getFeaturedInnovationListing(){
    return this.http.get(this.baseAPi+'/get-allfeaturedlisting')
  }

  public getFeaturedCategories(){
    return this.http.get(this.baseAPi+'/get-allfeaturedcategory')
  }

  public getQuestionCountUserWise(id){
    return this.http.get(this.baseAPi+'/innovator-questionscount/'+id)
  }

  public getStarRatings(id){
    return this.http.get(this.baseAPi+'/innovator-reviewcount/'+id)
  }

  public getAvgRatings(id){
    return this.http.get(this.baseAPi+'/innovator-startratingcount/'+id)
  }

  public getReviewsRecieved(id){
    return this.http.get(this.baseAPi+'/innovator-reviewcount/'+id)
  }

  public getDeviceViews(id){
    return this.http.get(this.baseAPi+'/innovator-viewcount/'+id)
  }

  public updateViewCount(obj){
    return this.http.post(this.baseAPi+'/update-viewcount',obj)
  }

  public getWeeklyReview(id){
    return this.http.get(this.baseAPi+'/weeklyinnovators-reviewcount/'+id)
  }

  public getWeeklyViews(id){
    return this.http.get(this.baseAPi+'/weeklyinnovators-viewcount/'+id)
  }

  public searchInnovatorListing(obj){
    return this.http.post(this.baseAPi+'search-listing',obj)
  }

  /**** by #as ***/
  public hospitalCategoryListing(){
    return this.http.get(this.baseAPi+'/hospitals-categorieslist/')
  }
  public hospitalItemListing(cat_id){
    return this.http.post(this.baseAPi+'/hospitals-itemlist/',cat_id)
  }
  public hospitalDataAdd(formvalue){
    return this.http.post(this.baseAPi+'add-hospitals/',formvalue)
  }
  public hospitalsIcuItemListing(user_id){
    return this.http.get(this.baseAPi+'hospital-list/'+user_id)
  }
  public hospitalsIcuItemEdit(id){
    return this.http.get(this.baseAPi+'icu-itemdetail/'+id)
  }

  public deleteHospital(id){
    return this.http.get(this.baseAPi+'/hospital-delete/'+id)
  }
  public getHospitalDetail(id){
    return this.http.get(this.baseAPi+'/hospital-detail/'+id)
  }
  public updateHospitalData(formvalue){
    return this.http.post(this.baseAPi+'/update-hospitaldata/',formvalue)
  }

  public hospitalItemData(formvalue){
    return this.http.post(this.baseAPi+'/add-hospital-item-data/',formvalue)
  }

  public hospitalItemUpdate(formvalue){
    return this.http.post(this.baseAPi+'/icu-itemupdate/',formvalue)
  }

  public hospitalItemList(formvalue){
    return this.http.post(this.baseAPi+'/hospital-item-list/',formvalue)
  }
  public hospitalItemListDelete(id){
    return this.http.get(this.baseAPi+'/hospital-item-delete/'+id)
  }
  public hospitalVerify(formvalue){
    return this.http.post(this.baseAPi+'/upload-document',formvalue)
  }

  public hospitalDashboardCount(formvalue){
    return this.http.post(this.baseAPi+'/hospitaluser-dashboardcount',formvalue)
  }

  
  public hospitalDashboardCountGraphData(formvalue){
    return this.http.post(this.baseAPi+'/hospitaluser-dashboardgraph',formvalue)
  }
  /*****by #as end **/

  public getAllMapsNeeds(){
    return this.http.get(this.baseAPi+'/hospital-list-onmap')
  }

  public getAllItemLists(){
    return this.http.get(this.baseAPi+'hospital-item-list');
  }

  public searchListing(obj){
    return this.http.post(this.baseAPi+'/hospital-map-filter',obj)
  }
 

}