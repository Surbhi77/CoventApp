/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {AgmCoreModule} from '@agm/core'
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { LibraryFilterComponent } from './common/library-filter/library-filter.component';
import { LibraryDetailsComponent } from './library-details/library-details.component';
import { LibraryComponent } from './library/library.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MapComponent } from './map/map.component';
import { MapDetailsComponent } from './map-details/map-details.component';
import { InnovatorListingComponent } from './innovator-listing/innovator-listing.component';
import { RatingModule } from 'ng-starrating';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthguardGuard } from './guard/authguard.guard';
import { ApiService } from './services/api.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { Ng2GoogleChartsModule, GoogleChartsSettings } from 'ng2-google-charts';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DataTablesModule } from 'angular-datatables';

const MyGoogleChartsSettings: GoogleChartsSettings = {
  mapsApiKey: 'AIzaSyA8KcJJZ6LmfcZS7orRbfkO_bhpQBPhqbk'
};
@NgModule({
  declarations: [AppComponent, 
                HomeComponent, 
                HeaderComponent, 
                FooterComponent, 
                LibraryFilterComponent, 
                LibraryDetailsComponent, 
                LibraryComponent, 
                AboutUsComponent, 
                ContactUsComponent, 
                MapComponent, 
                MapDetailsComponent, 
                InnovatorListingComponent, 
                ForgotPasswordComponent],
  imports: [
    GooglePlaceModule,
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    Ng2GoogleChartsModule,
    AgmCoreModule.forRoot({
    apiKey: 'AIzaSyA8KcJJZ6LmfcZS7orRbfkO_bhpQBPhqbk'}),
    //AgmCoreModule.forRoot({apiKey:'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY'}),
    ToastrModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
    DataTablesModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA8KcJJZ6LmfcZS7orRbfkO_bhpQBPhqbk',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    
  ],
  bootstrap: [AppComponent],
  providers: [ {
       provide: 'googleChartsSettings',
       useValue: MyGoogleChartsSettings,
    },
    AuthguardGuard,ApiService]
})
export class AppModule {
}
