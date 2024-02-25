import { Component, OnDestroy } from '@angular/core';
import { AddSectorRequest } from '../../Models/add-sector-request.model';
import { SectorService } from 'src/app/Services/sector.service';
import { Subscription } from 'rxjs';
import { Route, Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert/alert-service';

@Component({
  selector: 'app-addsector',
  templateUrl: './addsector.component.html',
  styleUrls: ['./addsector.component.css']
})
export class AddsectorComponent implements OnDestroy {

  model: AddSectorRequest;
  private addSectorSubscribtion: Subscription | undefined;

  constructor(private sectorService: SectorService, private router: Router, private alertService: AlertService) {
    this.model = {
      name: ''
    };
  }

  onFormSubmit() {
    this.addSectorSubscribtion = this.sectorService.addsector(this.model).subscribe({
      next: (response) => {
        this.alertService.showAlertMessage('Success', 'Added successfully', 'success');
        this.router.navigateByUrl('/admin/sector');
      },
      error: (error) => {
        this.alertService.showAlertMessage('Error', 'Unhandled exception', 'Error');
      }
    });
  }

  ngOnDestroy(): void {
    this.addSectorSubscribtion?.unsubscribe();
  }
}
