import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {HomeComponent} from './home/home.component';
import {LibraryDetailsComponent} from './library-details/library-details.component';
import {LibraryComponent} from './library/library.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {MapComponent} from './map/map.component';
import {MapDetailsComponent} from './map-details/map-details.component';
import {InnovatorListingComponent} from './innovator-listing/innovator-listing.component';

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
    .then(m => m.AuthModule), 
  },
  {
    path:'home',
    component:HomeComponent 
  },
  {
    path:'library-details/:id',
    component:LibraryDetailsComponent
  },
  {
    path:'library',
    component:LibraryComponent
  },
  {
    path:'about-us',
    component:AboutUsComponent
  },
  {
    path:'contact-us',
    component:ContactUsComponent
  },
  {
    path:'map',
    component:MapComponent
  },
  {
    path:'map-details',
    component:MapDetailsComponent
  },
  {
    path:'innovator-listing/:id',
    component:InnovatorListingComponent
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
