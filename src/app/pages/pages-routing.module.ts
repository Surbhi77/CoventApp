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
import { HospitalIcuNeedListComponent } from './hospital-icu-need-list/hospital-icu-need-list.component';
import { HospitalUserVerificationComponent } from './hospital-user-verification/hospital-user-verification.component';
import { AuthguardGuard } from '../guard/authguard.guard';
import { ViewDetailsComponent } from './view-details/view-details.component';

import { MyreviewEditComponent } from './myreview-edit/myreview-edit.component';
import { HospitalIcuneedEditComponent } from './hospital-icuneed-edit/hospital-icuneed-edit.component';
import { StartTourComponent } from './start-tour/start-tour.component';
const routes: Routes = [{
  path: '',
  component: PagesComponent,canActivate:[AuthguardGuard],
  children: [
    {
      path: 'change-password',
      component: ChangePasswordComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'dashboard',
      component: ECommerceComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'device-listing',
      component: DeviceListingComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'device-listing/:innovator_id',
      component:DeviceListingComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'view-detail/:innovator_id',
      component:ViewDetailsComponent,canActivate:[AuthguardGuard]
    },
    {
      path: 'review-listing/:innovator_id',
      component: ReviewListingComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'question-listing/:innovator_id',
      component: QuestionListingComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'edit-question/:question_id',
      component: EditQuestionComponent,canActivate:[AuthguardGuard],
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
      path: 'add-cms',
      component: AddCmsComponent,canActivate:[AuthguardGuard],
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
      path: 'data-listing',
      component: CmsComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'review-list',
      component: MyReviewsComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'review-edit/:id',
      component: MyreviewEditComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'hospital-form',
      component: HospitalNeedFormComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'hospital-list',
      component: HospitalsItemListComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'hospital-edit/:id',
      component: HospitalItemEditComponent,canActivate:[AuthguardGuard],
    },
    {
      path: 'hospital-ICU-need',
      component: HospitalIcuNeedFormComponent
    },
    {
      path: 'edit-ICU-need/:id',
      component: HospitalIcuneedEditComponent
    },

    {
      path: 'hospital-ICU-need-list',
      component: HospitalIcuNeedListComponent
    },
    {
      path: 'hospital-verification',
      component: HospitalUserVerificationComponent
    },
    {
      path: 'start-tour',
      component: StartTourComponent
    },

    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
      component: HospitalIcuNeedFormComponent,canActivate:[AuthguardGuard],
    },
    // {
    //   path: 'layout',
    //   loadChildren: () => import('./layout/layout.module')
    //     .then(m => m.LayoutModule),
    // },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    // {
    //   path: 'ui-features',
    //   loadChildren: () => import('./ui-features/ui-features.module')
    //     .then(m => m.UiFeaturesModule),
    // },
    // {
    //   path: 'modal-overlays',
    //   loadChildren: () => import('./modal-overlays/modal-overlays.module')
    //     .then(m => m.ModalOverlaysModule),
    // },
    // {
    //   path: 'extra-components',
    //   loadChildren: () => import('./extra-components/extra-components.module')
    //     .then(m => m.ExtraComponentsModule),
    // },
    // {
    //   path: 'maps',
    //   loadChildren: () => import('./maps/maps.module')
    //     .then(m => m.MapsModule),
    // },
    // {
    //   path: 'charts',
    //   loadChildren: () => import('./charts/charts.module')
    //     .then(m => m.ChartsModule),
    // },
    // {
    //   path: 'editors',
    //   loadChildren: () => import('./editors/editors.module')
    //     .then(m => m.EditorsModule),
    // },
    // {
    //   path: 'tables',
    //   loadChildren: () => import('./tables/tables.module')
    //     .then(m => m.TablesModule),
    // },
    // {
    //   path: 'miscellaneous',
    //   loadChildren: () => import('./miscellaneous/miscellaneous.module')
    //     .then(m => m.MiscellaneousModule),
    // },
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
