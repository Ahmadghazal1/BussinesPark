import { Component } from '@angular/core';
import { error } from 'jquery';
import { Observable } from 'rxjs';
import { Complaint } from 'src/app/Models/complaint.model';
import { AlertService } from 'src/app/Services/alert/alert-service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-company-complaint',
  templateUrl: './company-complaint.component.html',
  styleUrls: ['./company-complaint.component.css']
})
export class CompanyComplaintComponent {
  complaints$?: Observable<Complaint[]>;
  dtOptions: DataTables.Settings = {};
  constructor(private sharedService: SharedService, private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.complaints$ = this.sharedService.getAllComplaints();
  }
  Delete(id: string) {
    this.sharedService.deleteComplaint(id).subscribe({
      next: (response) => {
        this.alertService.showAlertMessage('Success', 'Deleted successfully', 'success');

      }, error: (error) => {

      }
    })
  }
}
