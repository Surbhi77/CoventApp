import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { DeviceListingComponent } from './device-listing/device-listing.component';
import { DeviceInnovatorsListingComponent } from './device-innovators-listing/device-innovators-listing.component';
import { CmsComponent } from './cms/cms.component';
import { FormsModule as ngFormsModule,ReactiveFormsModule } from '@angular/forms';

import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbStepperModule,
  NbTabsetModule,
} from '@nebular/theme';
import { SliderManagementComponent } from './slider-management/slider-management.component';
import { AddCmsComponent } from './add-cms/add-cms.component';
import { AddSlidersComponent } from './add-sliders/add-sliders.component';
import { WebsiteUserListingComponent } from './website-user-listing/website-user-listing.component';
import { ReviewerListingComponent } from './reviewer-listing/reviewer-listing.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { ReviewListingComponent } from './review-listing/review-listing.component';
import { QuestionListingComponent } from './question-listing/question-listing.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { MyReviewsComponent } from './my-reviews/my-reviews.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HospitalNeedFormComponent } from './hospital-need-form/hospital-need-form.component';
import { HospitalsItemListComponent } from './hospitals-item-list/hospitals-item-list.component';
import { HospitalItemEditComponent } from './hospital-item-edit/hospital-item-edit.component';
import { HospitalIcuNeedFormComponent } from './hospital-icu-need-form/hospital-icu-need-form.component';

import { HospitalIcuNeedListComponent } from './hospital-icu-need-list/hospital-icu-need-list.component';
import { HospitalUserVerificationComponent } from './hospital-user-verification/hospital-user-verification.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { ViewDetailsComponent } from './view-details/view-details.component';
const materialModules = [
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatRadioModule,
  MatButtonModule,
  MatButtonToggleModule,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    GooglePlaceModule,
    ECommerceModule,
    MiscellaneousModule,
    Ng2SmartTableModule,
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbDatepickerModule, NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    ngFormsModule,
    ReactiveFormsModule,
    NbStepperModule,
    NbTabsetModule,
    ...materialModules,
  ],
  declarations: [
    PagesComponent,
    DeviceListingComponent,
    DeviceInnovatorsListingComponent,
    CmsComponent,
    SliderManagementComponent,
    AddCmsComponent,
    AddSlidersComponent,
    WebsiteUserListingComponent,
    ReviewerListingComponent,
    NewsletterComponent,
    ReviewListingComponent,
    QuestionListingComponent,
    EditQuestionComponent,
    MyReviewsComponent,
    ChangePasswordComponent,
    HospitalNeedFormComponent,
    HospitalsItemListComponent,
    HospitalItemEditComponent,
    HospitalIcuNeedFormComponent,
    HospitalIcuNeedListComponent,
    HospitalUserVerificationComponent,
    ViewDetailsComponent,
  ],
})
export class PagesModule {
}
