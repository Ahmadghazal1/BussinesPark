import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Sector } from 'src/app/Models/sector.model';
import { UpdateSectorRequest } from 'src/app/Models/update-sector-request.model';
import { AlertService } from 'src/app/Services/alert/alert-service';
import { SectorService } from 'src/app/Services/sector.service';

@Component({
  selector: 'app-edit-sector',
  templateUrl: './edit-sector.component.html',
  styleUrls: ['./edit-sector.component.css']
})
export class EditSectorComponent implements OnInit, OnDestroy {
  sectorId: string | null = null;
  paramsSubscription: Subscription | undefined;
  sector: Sector | undefined;
  editSectorSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute, private sectorService: SectorService,
    private router: Router, private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.sectorId = params.get('sectorId')
        if (this.sectorId) {
          this.sectorService.getSectorById(this.sectorId).subscribe({
            next: (response) => {
              this.sector = response;
            }
          })
        }
      }
    })
  }
  onFormSubmit() {
    const updateSectorRequest: UpdateSectorRequest = {
      name: this.sector?.name ?? ''
    };
    // pass this object to service 
    if (this.sectorId) {
      this.editSectorSubscription = this.sectorService.updateSector(this.sectorId, updateSectorRequest).subscribe({
        next: (response) => {
          this.alertService.showAlertMessage('Success', 'Updated successfully', 'success');
          this.router.navigateByUrl('/admin/sector');
        },
        error: (error) => {
          this.alertService.showAlertMessage('Error', 'Unhandled exception', 'Error');
        }
      });
    }

  }
  onDelete(): void {
    if (this.sectorId) {
      this.sectorService.deleteSector(this.sectorId).subscribe({
        next: (response) => {
          this.alertService.showAlertMessage('Success', 'Deleted successfully', 'success');
          this.router.navigateByUrl('/admin/sector');
        },
        error: (error) => {
          this.alertService.showAlertMessage('Error', 'Unhandled exception', 'Error');
        }
      });

    }
  }
  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editSectorSubscription?.unsubscribe();
  }



}
