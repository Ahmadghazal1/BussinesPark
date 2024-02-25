import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { event } from 'jquery';
import { Observable, Subscription } from 'rxjs';
import { AddCompanyRequest } from 'src/app/Models/add-company.request.model';
import { Sector } from 'src/app/Models/sector.model';
import { AlertService } from 'src/app/Services/alert/alert-service';
import { CompanyService } from 'src/app/Services/company.service';
import { SectorService } from 'src/app/Services/sector.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnDestroy, OnInit {
  model: AddCompanyRequest;
  myLang: string;
  private addCompanySubscribtion: Subscription | undefined;
  sectors$: Observable<Sector[]> | undefined;
  constructor(private companyService: CompanyService, private router: Router,
    private sectorService: SectorService, private alertService: AlertService, private translate: TranslateService) {
    this.model = {
      name: '',
      description: '',
      sectorId: '',
      address: '',
      mobileNumber: '',
      size: 0,
      email: ''

    };
    debugger
    if (localStorage.getItem("language") && localStorage.getItem("language") != 'null' && localStorage.getItem("language") != '') {

      this.myLang = localStorage.getItem("language") ?? '';

    }
    else {
      this.myLang = "ar";
    }

    localStorage.setItem("language", this.myLang);
    const storedLanguage = localStorage.getItem("language");

    if (storedLanguage !== null) {
      this.translate.use(storedLanguage);
    }
  }

  ngOnInit(): void {
    this.sectors$ = this.sectorService.getAllSector();
  }

  onFormSubmit() {
    this.addCompanySubscribtion = this.companyService.addCompany(this.model).subscribe({
      next: (response) => {
        this.alertService.showAlertMessage('Success', 'Added successfully', 'success');
        this.router.navigateByUrl('/admin/company');

      },
      error: (error) => {
        this.alertService.showAlertMessage('Error', 'Unhandled exception', 'Error');
      }
    });
  }

  ngOnDestroy(): void {
    this.addCompanySubscribtion?.unsubscribe();
  }
}
