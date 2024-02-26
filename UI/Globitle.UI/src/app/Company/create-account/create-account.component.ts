import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'jquery';
import { Subscription } from 'rxjs';
import { Company } from 'src/app/Models/company.model';
import { RegisterRequest } from 'src/app/Models/register.mode';
import { AlertService } from 'src/app/Services/alert/alert-service';
import { AuthService } from 'src/app/Services/auth.service';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit, OnDestroy {
  companyId: string | null = null;
  paramsSubscription: Subscription | undefined;
  company: Company | undefined;
  request: RegisterRequest | undefined;
  showPassword?: boolean;

  constructor(private route: ActivatedRoute, private authService: AuthService,
    private companySerivce: CompanyService, private alertService: AlertService, private router: Router) {
    this.request = {
      email: '',
      username: '',
      password: '',
      companyId: ''
    };
  }

  ngOnInit(): void {

    this.paramsSubscription = this.route.paramMap.subscribe({

      next: (params) => {
        this.companyId = params.get('companyId')
        if (this.companyId) {
          this.companySerivce.getcompanyById(this.companyId).subscribe({
            next: (response) => {
              this.company = response;
            }
          })
        }
      }
    })


  }

  onFormSubmit(): void {
    if (this.request) {
      if (this.companyId) {
        this.request.companyId = this.companyId;
      }
      if (this.company)
        this.request.email = this.company?.email;
      debugger
      this.authService.register(this.request).subscribe({
        next: (Response) => {
          this.alertService.showAlertMessage('Success', 'Create account successfully', 'success');
          this.router.navigateByUrl('/admin/company');
        },
        error: error => {
          this.alertService.showAlertMessage('Error', 'Unhandled exception', 'Error');
        }

      })
      debugger
    }


  }
  generateRandomPassword(): void {
    debugger
    if (this.request)
      this.request.password = this.generate();
  }

  myFunction(): void {
    this.showPassword = !this.showPassword;

  }

  generate(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
    const minLength = 6;
    const maxLength = 8;

    const passwordLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let password = '';

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }

    return password;
  }
  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }

}
