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
} from '@nebular/theme';
import { SliderManagementComponent } from './slider-management/slider-management.component';
import { AddCmsComponent } from './add-cms/add-cms.component';
import { AddSlidersComponent } from './add-sliders/add-sliders.component';
import { WebsiteUserListingComponent } from './website-user-listing/website-user-listing.component';
import { ReviewerListingComponent } from './reviewer-listing/reviewer-listing.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { DataTablesModule } from 'angular-datatables';
import { ReviewerListComponent } from './reviewer-list/reviewer-list.component';
import { ComplianceComponent } from './compliance/compliance.component';
import { CharacteristicsComponent } from './characteristics/characteristics.component';
import { ComplianceListingComponent } from './compliance-listing/compliance-listing.component';
import { CharacteristicListingComponent } from './characteristic-listing/characteristic-listing.component';
import { DeviceCategoryListingComponent } from './device-category-listing/device-category-listing.component';
import { HospitalsUsersComponent } from './hospitals-users/hospitals-users.component';
import { HospitalsListComponent } from './hospitals-list/hospitals-list.component';
import { HospitalDetailComponent } from './hospital-detail/hospital-detail.component';
import { DeviceInnovatorDetailComponent } from './device-innovator-detail/device-innovator-detail.component';
import { IcuneedListComponent } from './icuneed-list/icuneed-list.component';
import { MapSettingComponent } from './map-setting/map-setting.component';
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
    DataTablesModule,
    ECommerceModule,
    MiscellaneousModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
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
    ReviewerListComponent,
    ComplianceComponent,
    CharacteristicsComponent,
    ComplianceListingComponent,
    CharacteristicListingComponent,
    DeviceCategoryListingComponent,
    HospitalsUsersComponent,
    HospitalsListComponent,
    HospitalDetailComponent,
    DeviceInnovatorDetailComponent,
    IcuneedListComponent,
    MapSettingComponent,
  ],
})
export class PagesModule {
}
