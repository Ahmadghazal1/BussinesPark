import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SectorListComponent } from './Sector/sector-list/sector-list.component';
import { NavBarComponent } from './Core/Components/nav-bar/nav-bar.component';
import { AddsectorComponent } from './Sector/addsector/addsector.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EditSectorComponent } from './Sector/edit-sector/edit-sector.component';
import { CompanyListComponent } from './Company/company-list/company-list.component';
import { AddCompanyComponent } from './Company/add-company/add-company.component';
import { EditCompanyComponent } from './Company/edit-company/edit-company.component';
import { AlertService } from './Services/alert/alert-service';
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from 'angular-datatables';
import { SuggestionComponent } from './Forms/suggestion/suggestion.component';
import { LoginComponent } from './Auth/login/login.component';
import { HomeComponent } from './Home/home/home.component';
import { CreateAccountComponent } from './Company/create-account/create-account.component';
import { ComplaintComponent } from './Forms/complaint/complaint.component';
import { CompanyComplaintComponent } from './Forms/company-complaint/company-complaint.component';
import { CompanySuggestionComponent } from './Forms/company-suggestion/company-suggestion.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LoadingInterceptor } from './interceptor/loading.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    SectorListComponent,
    NavBarComponent,
    AddsectorComponent,
    EditSectorComponent,
    CompanyListComponent,
    AddCompanyComponent,
    EditCompanyComponent,
    SuggestionComponent,
    LoginComponent,
    HomeComponent,
    CreateAccountComponent,
    ComplaintComponent,
    CompanyComplaintComponent,
    CompanySuggestionComponent,
    AdminHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ToastrModule.forRoot(),
    DataTablesModule,
    NgxSpinnerModule.forRoot({
      type: 'timer'
    }),
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  providers: [
    AlertService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  exports: [
    ToastrModule,
    FontAwesomeModule,


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
