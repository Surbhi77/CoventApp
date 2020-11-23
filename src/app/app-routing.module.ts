import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {HomeComponent} from './home/home.component';
import {LibraryDetailsComponent} from './library-details/library-details.component';
import {LibraryComponent} from './library/library.component';

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
    path:'library-details',
    component:LibraryDetailsComponent
  },
  {
    path:'library',
    component:LibraryComponent
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
