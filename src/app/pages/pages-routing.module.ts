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

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
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
      path: 'reviewer-user-listing',
      component: ReviewerListComponent,
    },
    {
      path: 'add-cms',
      component: AddCmsComponent,
    },
    {
      path: 'add-compliance',
      component: ComplianceComponent
    },
    {
      path:'edit-compliance/:id',
      component:ComplianceComponent
    },
    {
      path:'add-characteristics',
      component:CharacteristicsComponent
    },
    {
      path:'edit-characteristics/:id',
      component:CharacteristicsComponent
    },
    {
      path:'compliance-listing',
      component:ComplianceListingComponent
    },
    {
      path:'characteristic-listing',
      component:CharacteristicListingComponent
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
      path: 'cms',
      component: CmsComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
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
