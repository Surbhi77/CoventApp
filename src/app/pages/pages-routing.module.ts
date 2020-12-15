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
import { DeviceListingComponent } from './device-listing/device-listing.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ReviewListingComponent } from './review-listing/review-listing.component';
import { QuestionListingComponent } from './question-listing/question-listing.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { MyReviewsComponent } from './my-reviews/my-reviews.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HospitalNeedFormComponent } from './hospital-need-form/hospital-need-form.component';
import { HospitalsItemListComponent } from './hospitals-item-list/hospitals-item-list.component';
import { HospitalItemEditComponent } from './hospital-item-edit/hospital-item-edit.component';
import { HospitalIcuNeedFormComponent } from './hospital-icu-need-form/hospital-icu-need-form.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'change-password',
      component: ChangePasswordComponent,
    },
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'device-listing', 
      component: DeviceListingComponent,
    },
    {
      path: 'device-listing/:innovator_id',
      component:DeviceListingComponent
    },
    {
      path: 'review-listing/:innovator_id', 
      component: ReviewListingComponent,
    },
    {
      path: 'question-listing/:innovator_id', 
      component: QuestionListingComponent,
    },
    {
      path: 'edit-question/:question_id', 
      component: EditQuestionComponent,
    },
    {
      path: 'newsletter', 
      component: NewsletterComponent,
    },
    {
      path: 'reviewer-listing',
      component: ReviewerListingComponent,
    },
    {
      path: 'website-user-listing',
      component: WebsiteUserListingComponent,
    },
    {
      path: 'add-cms',
      component: AddCmsComponent,
    },
    {
      path: 'add-sliders',
      component: AddSlidersComponent,
    },
    {
      path: 'slider-management',
      component: SliderManagementComponent,
    },
    {
      path: 'device-innovators-listing',
      component: DeviceInnovatorsListingComponent,
    },
    {
      path: 'data-listing',
      component: CmsComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'review-list',
      component: MyReviewsComponent
    },
    {
      path: 'hospital-form',
      component: HospitalNeedFormComponent
    },
    {
      path: 'hospital-list',
      component: HospitalsItemListComponent
    },
    {
      path: 'hospital-edit/:id',
      component: HospitalItemEditComponent
    },
    {
      path: 'hospital-ICU-need',
      component: HospitalIcuNeedFormComponent
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
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
