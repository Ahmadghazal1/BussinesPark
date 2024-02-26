import { Component, OnInit } from '@angular/core';
import { ComplaintRequest } from 'src/app/Models/compaint-comapny-request.model';
import { User } from 'src/app/Models/user.model';
import { AlertService } from 'src/app/Services/alert/alert-service';
import { AuthService } from 'src/app/Services/auth.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements OnInit {
  user: User | undefined;
  model: ComplaintRequest | undefined
  constructor(private sharedService: SharedService, private authService: AuthService, private alertService: AlertService) {
    this.model = {
      title: '',
      description: '',
      companyId: ''

    };
  }
  ngOnInit(): void {
    this.user = this.authService.getUser();
  }
  onFormSubmit(): void {
    debugger
    if (this.model) {
      if (this.user) {
        this.model.companyId = this.user.companyId;
      }
      this.sharedService.addComplaint(this.model).subscribe({
        next: (response) => {
          this.alertService.showAlertMessage('Success', 'Your complaint sent successfully', 'success');
          window.location.reload();

        },
        error: (error) => {
          this.alertService.showAlertMessage('Error', 'Unhandled exception', 'Error');
        }
      })


    }

  }
}
