import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeviceInnovatorsListingComponent } from './device-innovators-listing/device-innovators-listing.component';
import { CmsComponent } from './cms/cms.component';
import { SliderManagementComponent } from './slider-management/slider-management.component';
import { AddCmsComponent } from './add-cms/add-cms.component';
import { AddSlidersComponent } from './add-sliders/add-sliders.component';
import { WebsiteUserListingComponent } from './website-user-listing/website-user-listing.component';
import { ReviewerListingComponent } from './reviewer-listing/reviewer-listing.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import {ReviewerListComponent} from './reviewer-list/reviewer-list.component';
import {ComplianceComponent} from './compliance/compliance.component'
import { CharacteristicsComponent } from './characteristics/characteristics.component';
import { ComplianceListingComponent } from './compliance-listing/compliance-listing.component';
import { CharacteristicListingComponent } from './characteristic-listing/characteristic-listing.component';
import { DeviceCategoryListingComponent } from './device-category-listing/device-category-listing.component';
import { HospitalsUsersComponent } from './hospitals-users/hospitals-users.component';
import { HospitalsListComponent } from './hospitals-list/hospitals-list.component';
import { HospitalDetailComponent } from './hospital-detail/hospital-detail.component';
import { DeviceInnovatorDetailComponent } from './device-innovator-detail/device-innovator-detail.component';
import { AuthguardGuard } from 'app/guard/authguard.guard';
import { IcuneedListComponent } from './icuneed-list/icuneed-list.component';
const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'newsletter',
      component: NewsletterComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'reviewer-listing',
      component: ReviewerListingComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'website-user-listing',
      component: WebsiteUserListingComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'hospitals-users',
      component: HospitalsUsersComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'hospitals-list',
      component: HospitalsListComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'hospitals-detail/:id',
      component: HospitalDetailComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'device-innovatory-detail/:id',
      component: DeviceInnovatorDetailComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'reviewer-user-listing',
      component: ReviewerListComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'add-cms',
      component: AddCmsComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'add-compliance',
      component: ComplianceComponent,canActivate:[AuthguardGuard],
    },
    {
      path:'edit-compliance/:id',
      component:ComplianceComponent,canActivate:[AuthguardGuard],
    },
    {
      path:'add-characteristics',
      component:CharacteristicsComponent,canActivate:[AuthguardGuard],
    },
    {
      path:'edit-characteristics/:id',
      component:CharacteristicsComponent,canActivate:[AuthguardGuard],
    },
    {
      path:'compliance-listing',
      component:ComplianceListingComponent,canActivate:[AuthguardGuard],
    },
    {
      path:'characteristic-listing',
      component:CharacteristicListingComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'add-sliders',
      component: AddSlidersComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'slider-management',
      component: SliderManagementComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'device-innovators-listing',
      component: DeviceInnovatorsListingComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'device-category-listing',
      component: DeviceCategoryListingComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'cms',
      component: CmsComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'icu-need-List',
      component: IcuneedListComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
