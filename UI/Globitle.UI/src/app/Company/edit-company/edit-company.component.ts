import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Company } from 'src/app/Models/company.model';
import { Sector } from 'src/app/Models/sector.model';
import { UpdateCompanyRequest } from 'src/app/Models/update-company-request.model';
import { AlertService } from 'src/app/Services/alert/alert-service';
import { CompanyService } from 'src/app/Services/company.service';
import { SectorService } from 'src/app/Services/sector.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent {
  companyId: string | null = null;
  paramsSubscription: Subscription | undefined;
  company: Company | undefined;
  editCompanySubscription: Subscription | undefined;
  sectors$: Observable<Sector[]> | undefined;
  selectedSector: string | undefined;

  constructor(private route: ActivatedRoute, private companyService: CompanyService, private router: Router,
    private sectorService: SectorService, private alertService: AlertService) {
  }

  ngOnInit(): void {

    this.sectors$ = this.sectorService.getAllSector();
    this.paramsSubscription = this.route.paramMap.subscribe({

      next: (params) => {
        this.companyId = params.get('companyId')
        if (this.companyId) {
          this.companyService.getcompanyById(this.companyId).subscribe({
            next: (response) => {
              this.company = response;
              this.selectedSector = response.sector.sectorId;
            }
          })
        }
      }
    })


  }
  onFormSubmit() {
    const updateCompanyRequest: UpdateCompanyRequest = {
      name: this.company?.name || '',
      description: this.company?.description || '',
      mobileNumber: this.company?.mobileNumber || '',
      address: this.company?.address || '',
      size: this.company?.size || 0,
      sectorId: this.company?.sectorId || '',
      email: this.company?.email ?? ''
    };
    if (this.selectedSector) {
      updateCompanyRequest.sectorId = this.selectedSector;
    }
    // pass this object to service 
    if (this.companyId) {
      this.editCompanySubscription = this.companyService.updateCompany(this.companyId, updateCompanyRequest).subscribe({
        next: (response) => {
          this.alertService.showAlertMessage('Success', 'Updated successfully', 'success');
          this.router.navigateByUrl('/admin/company');
        },
        error: (error) => {
          this.alertService.showAlertMessage('Error', 'Unhandled exception', 'Error');
        }
      });
    }

  }
  onDelete(): void {
    if (this.companyId) {
      this.companyService.deleteCompany(this.companyId).subscribe({
        next: (response) => {
          this.alertService.showAlertMessage('Success', 'Deleted successfully', 'success');
          this.router.navigateByUrl('/admin/company');

        },
        error: (error) => {
          this.alertService.showAlertMessage('Error', 'Unhandled exception', 'Error');
        }
      });

    }
  }
  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCompanySubscription?.unsubscribe();
  }
}
