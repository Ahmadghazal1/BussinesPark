import { Component } from '@angular/core';
import { SuggestionRequest } from 'src/app/Models/suggestion-company-request.mode';
import { User } from 'src/app/Models/user.model';
import { AlertService } from 'src/app/Services/alert/alert-service';
import { AuthService } from 'src/app/Services/auth.service';
import { SuggestionService } from 'src/app/Services/suggestion.service';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent {
  user: User | undefined;
  model: SuggestionRequest | undefined
  constructor(private suggestionService: SuggestionService, private authService: AuthService, private alertService: AlertService) {
    this.model = {
      subject: '',
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
      this.suggestionService.addSuggestion(this.model).subscribe({
        next: (response) => {
          this.alertService.showAlertMessage('Success', 'Your suggestion sent successfully', 'success');
          window.location.reload();

        },
        error: (error) => {
          this.alertService.showAlertMessage('Error', 'Unhandled exception', 'Error');
        }
      })


    }

  }
}
