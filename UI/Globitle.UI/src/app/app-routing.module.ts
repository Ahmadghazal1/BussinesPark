import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectorListComponent } from './Sector/sector-list/sector-list.component';
import { AddsectorComponent } from './Sector/addsector/addsector.component';
import { EditSectorComponent } from './Sector/edit-sector/edit-sector.component';
import { CompanyListComponent } from './Company/company-list/company-list.component';
import { AddCompanyComponent } from './Company/add-company/add-company.component';
import { EditCompanyComponent } from './Company/edit-company/edit-company.component';
import { SuggestionComponent } from './Forms/suggestion/suggestion.component';
import { LoginComponent } from './Auth/login/login.component';
import { HomeComponent } from './Home/home/home.component';
import { authGuard } from './Auth/guards/auth.guard';
import { CreateAccountComponent } from './Company/create-account/create-account.component';
import { ComplaintComponent } from './Forms/complaint/complaint.component';
import { CompanyComplaintComponent } from './Forms/company-complaint/company-complaint.component';
import { CompanySuggestionComponent } from './Forms/company-suggestion/company-suggestion.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: 'admin/home',
    component: AdminHomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/sector',
    component: SectorListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/sector/add',
    component: AddsectorComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/sector/:sectorId',
    component: EditSectorComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/company',
    component: CompanyListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/company/add',
    component: AddCompanyComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/company/:companyId',
    component: EditCompanyComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/create-account/:companyId',
    component: CreateAccountComponent,
    canActivate: [authGuard]
  },
  {
    path: 'suggestion',
    component: SuggestionComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'complaint',
    component: ComplaintComponent
  },
  {
    path: 'admin/complaint',
    component: CompanyComplaintComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/suggestion',
    component: CompanySuggestionComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
